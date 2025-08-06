import User from '../models/userModel.js';
import { z } from 'zod';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, occupation, photoUrl, instagram, linkedin, github, facebook } = req.body;
    
    const profileSchema = z.object({
      username: z.string().min(1, "Username is required").optional(),
      bio: z.string().optional(),
      occupation: z.string().optional(),
      photoUrl: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      facebook: z.string().url().optional()
    });

    const result = profileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors
      });
    }

    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already taken"
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};

// Get user's events
export const getUserEvents = async (req, res) => {
  try {
    const Event = (await import('../models/eventModel.js')).default;
    
    const events = await Event.find({ organizer: req.user.id })
      .populate('club', 'name')
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error("Get user events error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user events"
    });
  }
};

// Get user's clubs
export const getUserClubs = async (req, res) => {
  try {
    const Club = (await import('../models/clubModel.js')).default;
    
    const clubs = await Club.find({
      'members.user': req.user.id
    }).populate('admin', 'username email');

    return res.status(200).json({
      success: true,
      clubs
    });
  } catch (error) {
    console.error("Get user clubs error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user clubs"
    });
  }
};

// Get user's registered events
export const getUserRegisteredEvents = async (req, res) => {
  try {
    const Event = (await import('../models/eventModel.js')).default;
    
    const events = await Event.find({
      attendees: req.user.id
    }).populate('organizer', 'username email')
      .populate('club', 'name')
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error("Get user registered events error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user registered events"
    });
  }
}; 