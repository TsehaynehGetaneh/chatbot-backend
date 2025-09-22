import { Router } from 'express';
import { conversationController } from '../controllers/conversationController';
import { validateBody, validateParams, validateQuery } from '../middleware/validation';
import {
  createConversationSchema,
  updateConversationSchema,
  conversationParamsSchema,
  messageQuerySchema,
} from '../lib/validation';

const router = Router();

// GET /api/conversations - Get all conversations with pagination
router.get('/', validateQuery(messageQuerySchema), conversationController.getAllConversations);

// GET /api/conversations/:id - Get conversation by ID
router.get(
  '/:id',
  validateParams(conversationParamsSchema),
  conversationController.getConversationById
);

// POST /api/conversations - Create new conversation
router.post(
  '/',
  validateBody(createConversationSchema),
  conversationController.createConversation
);

// PUT /api/conversations/:id - Update conversation
router.put(
  '/:id',
  validateParams(conversationParamsSchema),
  validateBody(updateConversationSchema),
  conversationController.updateConversation
);

// DELETE /api/conversations/:id - Delete conversation
router.delete(
  '/:id',
  validateParams(conversationParamsSchema),
  conversationController.deleteConversation
);

export default router;
