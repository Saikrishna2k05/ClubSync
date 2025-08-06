import express from 'express'
import {login, signup} from '../controllers/userController.js'
// import userMiddleware from '../middlewares/userMiddleware.js'
const userApp=express.Router();

userApp.post('/login', login);
userApp.post('/signup', signup);

export default userApp;