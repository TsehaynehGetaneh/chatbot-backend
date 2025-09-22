import { Request, Response } from "express";
import { MessageService } from "../services/messageService";
import { asyncHandler } from "../middleware/errorHandler";

const messageService = new MessageService();

export const messageController = {
  getMessagesByConversationId: asyncHandler(
    async (req: Request, res: Response) => {
      const { conversationId } = (req as any).validatedParams || req.params;
      const query = (req as any).validatedQuery || req.query;
      const result = await messageService.getMessagesByConversationId(
        conversationId,
        query
      );

      res.status(200).json({
        success: true,
        data: result.messages,
        pagination: result.pagination,
      });
    }
  ),

  createMessage: asyncHandler(async (req: Request, res: Response) => {
    const message = await messageService.createMessage(req.body);

    res.status(201).json({
      success: true,
      data: message,
    });
  }),

  getMessageById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req as any).validatedParams || req.params;
    const message = await messageService.getMessageById(id);

    res.status(200).json({
      success: true,
      data: message,
    });
  }),
};
