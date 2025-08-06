import express from 'express';
import { 
  createClub, 
  getClubs, 
  getClub, 
  updateClub, 
  deleteClub,
  joinClub,
  leaveClub
} from '../controllers/clubController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const clubRouter = express.Router();

// Public routes
clubRouter.get('/', getClubs);
clubRouter.get('/:id', getClub);

// Protected routes
clubRouter.post('/', authenticateToken, createClub);
clubRouter.put('/:id', authenticateToken, updateClub);
clubRouter.delete('/:id', authenticateToken, deleteClub);
clubRouter.post('/:id/join', authenticateToken, joinClub);
clubRouter.post('/:id/leave', authenticateToken, leaveClub);

export default clubRouter; 