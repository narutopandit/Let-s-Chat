import express from 'express';
import { AuthMiddleware } from '../middleware/auth.js';
import { getMessages, getSidebarUser, markAsSeen, sendMessage } from '../controllers/messageCtrl.js';

const messageRouter = express.Router();

messageRouter.get('/users',AuthMiddleware, getSidebarUser);
messageRouter.get('/:selectedUserId',AuthMiddleware, getMessages); // Changed from :id to :selectedUserId
messageRouter.put('/mark/:id',AuthMiddleware, markAsSeen);
messageRouter.post('/send/:id',AuthMiddleware, sendMessage);

export default messageRouter;