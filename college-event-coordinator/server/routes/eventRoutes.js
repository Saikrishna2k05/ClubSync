import express from 'express';
import { 
  createEvent, 
  getEvents, 
  getEvent, 
  updateEvent, 
  deleteEvent,
  registerForEvent 
} from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const eventRouter = express.Router();

// Public routes
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEvent);

// Protected routes
eventRouter.post('/', authenticateToken, createEvent);
eventRouter.put('/:id', authenticateToken, updateEvent);
eventRouter.delete('/:id', authenticateToken, deleteEvent);
eventRouter.post('/:id/register', authenticateToken, registerForEvent);

export default eventRouter; 