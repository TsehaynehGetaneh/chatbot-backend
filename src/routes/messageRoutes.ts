import { Router } from 'express';
import { messageController } from '../controllers/messageController';
import { validateBody, validateParams, validateQuery } from '../middleware/validation';
import {
  createMessageSchema,
  messageParamsSchema,
  messageQuerySchema,
} from '../lib/validation';

const router = Router();

// GET /api/messages/:conversationId - Get messages by conversation ID
router.get(
  '/:conversationId',
  validateParams(messageParamsSchema),
  validateQuery(messageQuerySchema),
  messageController.getMessagesByConversationId
);

// POST /api/messages - Create new message
router.post(
  '/',
  validateBody(createMessageSchema),
  messageController.createMessage
);

// GET /api/messages/single/:id - Get message by ID
router.get(
  '/single/:id',
  validateParams(messageParamsSchema),
  messageController.getMessageById
);

export default router;
