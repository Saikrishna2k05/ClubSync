import express from 'express'
import {login, signup, logout} from '../controllers/userController.js'
// import userMiddleware from '../middlewares/userMiddleware.js'
const userApp=express.Router();

userApp.post('/login', login);
userApp.post('/signup', signup);
userApp.post('/logout', logout);

export default userApp;