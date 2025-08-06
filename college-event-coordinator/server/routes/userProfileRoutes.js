import express from 'express';
import { 
  getProfile, 
  updateProfile,
  getUserEvents,
  getUserClubs,
  getUserRegisteredEvents
} from '../controllers/userProfileController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const userProfileRouter = express.Router();

// All routes require authentication
userProfileRouter.use(authenticateToken);

userProfileRouter.get('/profile', getProfile);
userProfileRouter.put('/profile', updateProfile);
userProfileRouter.get('/events', getUserEvents);
userProfileRouter.get('/clubs', getUserClubs);
userProfileRouter.get('/registered-events', getUserRegisteredEvents);

export default userProfileRouter; 