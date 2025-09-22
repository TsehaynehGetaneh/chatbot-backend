import { Request, Response } from "express";
import { ConversationService } from "../services/conversationService";
import { asyncHandler } from "../middleware/errorHandler";

const conversationService = new ConversationService();

export const conversationController = {
  getAllConversations: asyncHandler(async (req: Request, res: Response) => {
    const query = (req as any).validatedQuery || req.query;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 20;

    const result = await conversationService.getAllConversations(page, limit);

    res.status(200).json({
      success: true,
      data: result.conversations,
      pagination: result.pagination,
    });
  }),

  getConversationById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req as any).validatedParams || req.params;
    const conversation = await conversationService.getConversationById(id);

    res.status(200).json({
      success: true,
      data: conversation,
    });
  }),

  createConversation: asyncHandler(async (req: Request, res: Response) => {
    const conversation = await conversationService.createConversation(req.body);

    res.status(201).json({
      success: true,
      data: conversation,
    });
  }),

  updateConversation: asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req as any).validatedParams || req.params;
    const conversation = await conversationService.updateConversation(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: conversation,
    });
  }),

  deleteConversation: asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req as any).validatedParams || req.params;
    const result = await conversationService.deleteConversation(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),
};
