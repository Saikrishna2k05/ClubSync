import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
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
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: 'clubs'
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  maxAttendees: {
    type: Number,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  tags: [{
    type: String
  }],
  registrationDeadline: {
    type: Date
  }
}, { timestamps: true });

const Event = mongoose.model('events', eventSchema);
export default Event; 