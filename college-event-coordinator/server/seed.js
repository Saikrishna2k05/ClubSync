import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Event from "./models/eventModel.js";
import Club from "./models/clubModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected for seeding");
  } catch (err) {
    console.log("MongoDB connection error", err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Club.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.create([
      {
        username: "john_doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "user",
        bio: "Computer Science student passionate about technology",
        occupation: "Student",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "clubAdmin",
        bio: "Event coordinator and club administrator",
        occupation: "Event Coordinator",
      },
      {
        username: "mike_wilson",
        email: "mike@example.com",
        password: hashedPassword,
        role: "eventCoordinator",
        bio: "Sports enthusiast and team leader",
        occupation: "Student",
      },
      {
        username: "sarah_jones",
        email: "sarah@example.com",
        password: hashedPassword,
        role: "user",
        bio: "Art and culture lover",
        occupation: "Student",
      },
    ]);

    console.log("Created users:", users.length);

    // Create clubs
    const clubs = await Club.create([
      {
        name: "Tech Innovators Club",
        description:
          "A community of technology enthusiasts working on cutting-edge projects and innovations.",
        category: "technical",
        admin: users[1]._id, // jane_smith
        members: [
          { user: users[0]._id, role: "member" },
          { user: users[2]._id, role: "moderator" },
          { user: users[3]._id, role: "member" },
        ],
        contactEmail: "tech@college.edu",
        socialLinks: {
          instagram: "techinnovators",
          linkedin: "tech-innovators-club",
          website: "https://techinnovators.edu",
        },
      },
      {
        name: "Cultural Arts Society",
        description:
          "Promoting arts, culture, and creative expression through various events and workshops.",
        category: "cultural",
        admin: users[3]._id, // sarah_jones
        members: [
          { user: users[0]._id, role: "member" },
          { user: users[1]._id, role: "member" },
        ],
        contactEmail: "arts@college.edu",
        socialLinks: {
          instagram: "culturalarts",
          facebook: "culturalartssociety",
        },
      },
      {
        name: "Sports & Fitness Club",
        description:
          "Encouraging healthy lifestyle through sports activities and fitness programs.",
        category: "sports",
        admin: users[2]._id, // mike_wilson
        members: [
          { user: users[0]._id, role: "member" },
          { user: users[1]._id, role: "member" },
          { user: users[3]._id, role: "member" },
        ],
        contactEmail: "sports@college.edu",
      },
    ]);

    console.log("Created clubs:", clubs.length);

    // Create events
    const events = await Event.create([
      {
        title: "Tech Meetup 2024",
        description:
          "Join us for an exciting evening of technology discussions, networking, and innovative project showcases.",
        date: new Date("2024-01-15"),
        time: "14:00",
        location: "Main Auditorium",
        category: "technical",
        organizer: users[1]._id,
        club: clubs[0]._id,
        attendees: [users[0]._id, users[2]._id],
        maxAttendees: 100,
        status: "upcoming",
        tags: ["technology", "networking", "innovation"],
      },
      {
        title: "Cultural Festival",
        description:
          "A celebration of diverse cultures through music, dance, art, and traditional performances.",
        date: new Date("2024-01-20"),
        time: "18:00",
        location: "Campus Grounds",
        category: "cultural",
        organizer: users[3]._id,
        club: clubs[1]._id,
        attendees: [users[0]._id, users[1]._id, users[2]._id],
        maxAttendees: 200,
        status: "upcoming",
        tags: ["culture", "arts", "festival"],
      },
      {
        title: "Career Fair",
        description:
          "Connect with top companies and explore career opportunities in various fields.",
        date: new Date("2024-01-25"),
        time: "10:00",
        location: "Conference Hall",
        category: "academic",
        organizer: users[1]._id,
        attendees: [users[0]._id, users[2]._id, users[3]._id],
        maxAttendees: 150,
        status: "upcoming",
        tags: ["career", "networking", "opportunities"],
      },
      {
        title: "Basketball Tournament",
        description:
          "Annual inter-college basketball tournament with exciting prizes and trophies.",
        date: new Date("2024-02-10"),
        time: "16:00",
        location: "Sports Complex",
        category: "sports",
        organizer: users[2]._id,
        club: clubs[2]._id,
        attendees: [users[0]._id, users[1]._id],
        maxAttendees: 50,
        status: "upcoming",
        tags: ["sports", "basketball", "tournament"],
      },
      {
        title: "Coding Workshop",
        description:
          "Learn advanced programming concepts and work on real-world projects.",
        date: new Date("2024-01-30"),
        time: "15:00",
        location: "Computer Lab",
        category: "technical",
        organizer: users[1]._id,
        club: clubs[0]._id,
        attendees: [users[0]._id, users[3]._id],
        maxAttendees: 30,
        status: "upcoming",
        tags: ["programming", "workshop", "learning"],
      },
    ]);

    console.log("Created events:", events.length);

    console.log("✅ Seed data created successfully!");
    console.log("\n📋 Sample Login Credentials:");
    console.log("Email: john@example.com, Password: password123");
    console.log("Email: jane@example.com, Password: password123");
    console.log("Email: mike@example.com, Password: password123");
    console.log("Email: sarah@example.com, Password: password123");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});
