import mongoose from "mongoose";
const { Schema } = mongoose;

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['academic', 'cultural', 'sports', 'technical', 'social', 'other']
  },
  imageUrl: {
    type: String,
    default: ""
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  tags: [{
    type: String
  }],
  contactEmail: {
    type: String
  },
  socialLinks: {
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    website: { type: String, default: "" }
  }
}, { timestamps: true });

const Club = mongoose.model('clubs', clubSchema);
export default Club; 