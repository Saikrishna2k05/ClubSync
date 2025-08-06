import Event from '../models/eventModel.js';
import { z } from 'zod';

// Create event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category, imageUrl, maxAttendees, isPublic, tags, registrationDeadline } = req.body;
    
    const eventSchema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      date: z.string().datetime(),
      time: z.string().min(1, "Time is required"),
      location: z.string().min(1, "Location is required"),
      category: z.enum(['academic', 'cultural', 'sports', 'technical', 'social', 'other']),
      imageUrl: z.string().optional(),
      maxAttendees: z.number().optional(),
      isPublic: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      registrationDeadline: z.string().datetime().optional()
    });

    const result = eventSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors
      });
    }

    const event = await Event.create({
      ...req.body,
      organizer: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (error) {
    console.error("Create event error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event"
    });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'username email')
      .populate('club', 'name')
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error("Get events error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
};

// Get single event
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id)
      .populate('organizer', 'username email')
      .populate('club', 'name')
      .populate('attendees', 'username email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    return res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    console.error("Get event error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event"
    });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event"
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('organizer', 'username email');

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Update event error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event"
    });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event"
      });
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    console.error("Delete event error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event"
    });
  }
};

// Register for event
export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Check if user is already registered
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this event"
      });
    }

    // Check if event is full
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: "Event is full"
      });
    }

    event.attendees.push(req.user.id);
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Successfully registered for event"
    });
  } catch (error) {
    console.error("Register for event error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register for event"
    });
  }
}; 