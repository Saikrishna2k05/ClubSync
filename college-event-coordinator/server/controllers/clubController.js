import Club from '../models/clubModel.js';
import { z } from 'zod';

// Create club
export const createClub = async (req, res) => {
  try {
    const { name, description, category, imageUrl, isPublic, tags, contactEmail, socialLinks } = req.body;
    
    const clubSchema = z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "Description is required"),
      category: z.enum(['academic', 'cultural', 'sports', 'technical', 'social', 'other']),
      imageUrl: z.string().optional(),
      isPublic: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      contactEmail: z.string().email().optional(),
      socialLinks: z.object({
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        facebook: z.string().optional(),
        website: z.string().optional()
      }).optional()
    });

    const result = clubSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors
      });
    }

    const club = await Club.create({
      ...req.body,
      admin: req.user.id,
      members: [{ user: req.user.id, role: 'admin' }]
    });

    return res.status(201).json({
      success: true,
      message: "Club created successfully",
      club
    });
  } catch (error) {
    console.error("Create club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create club"
    });
  }
};

// Get all clubs
export const getClubs = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const clubs = await Club.find(query)
      .populate('admin', 'username email')
      .populate('members.user', 'username email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      clubs
    });
  } catch (error) {
    console.error("Get clubs error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch clubs"
    });
  }
};

// Get single club
export const getClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id)
      .populate('admin', 'username email')
      .populate('members.user', 'username email');

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    return res.status(200).json({
      success: true,
      club
    });
  } catch (error) {
    console.error("Get club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch club"
    });
  }
};

// Update club
export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    // Check if user is the admin
    if (club.admin.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this club"
      });
    }

    const updatedClub = await Club.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('admin', 'username email');

    return res.status(200).json({
      success: true,
      message: "Club updated successfully",
      club: updatedClub
    });
  } catch (error) {
    console.error("Update club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update club"
    });
  }
};

// Delete club
export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    // Check if user is the admin
    if (club.admin.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this club"
      });
    }

    await Club.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Club deleted successfully"
    });
  } catch (error) {
    console.error("Delete club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete club"
    });
  }
};

// Join club
export const joinClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    // Check if user is already a member
    const isMember = club.members.some(member => member.user.toString() === req.user.id);
    if (isMember) {
      return res.status(400).json({
        success: false,
        message: "Already a member of this club"
      });
    }

    club.members.push({ user: req.user.id, role: 'member' });
    await club.save();

    return res.status(200).json({
      success: true,
      message: "Successfully joined club"
    });
  } catch (error) {
    console.error("Join club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to join club"
    });
  }
};

// Leave club
export const leaveClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    // Check if user is the admin
    if (club.admin.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot leave the club"
      });
    }

    // Remove user from members
    club.members = club.members.filter(member => member.user.toString() !== req.user.id);
    await club.save();

    return res.status(200).json({
      success: true,
      message: "Successfully left club"
    });
  } catch (error) {
    console.error("Leave club error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to leave club"
    });
  }
}; 