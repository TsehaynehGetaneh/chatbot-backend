import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.NODE_ENV === "production" 
        ? "ChatBot API - Production" 
        : "ChatBot API - Development",
      version: "1.0.0",
      description: process.env.NODE_ENV === "production"
        ? "Production API documentation for ChatBot application - Live Environment"
        : "Development API documentation for ChatBot application - Testing Environment",
    },
    servers: process.env.NODE_ENV === "production"
      ? [
          {
            url: "https://chatbot-backend-rlq8.onrender.com",
            description: "Production server",
          },
          {
            url: `http://localhost:${process.env.PORT || 3001}`,
            description: "Development server",
          },
        ]
      : [
          {
            url: `http://localhost:${process.env.PORT || 3001}`,
            description: "Development server",
          },
          {
            url: "https://chatbot-backend-rlq8.onrender.com",
            description: "Production server",
          },
        ],
    components: {
      schemas: {
        Conversation: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the conversation",
            },
            title: {
              type: "string",
              description: "Title of the conversation",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Message: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the message",
            },
            content: {
              type: "string",
              description: "Content of the message",
            },
            isFromUser: {
              type: "boolean",
              description:
                "Whether the message is from user (true) or chatbot (false)",
            },
            conversationId: {
              type: "string",
              description: "ID of the conversation this message belongs to",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
        },
      },
    },
    paths: {
      "/api/conversations": {
        get: {
          summary: "Get all conversations",
          description:
            "Retrieve a list of all conversations with their latest message preview",
          tags: ["Conversations"],
          responses: {
            "200": {
              description: "List of conversations retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: {
                              allOf: [
                                { $ref: "#/components/schemas/Conversation" },
                                {
                                  properties: {
                                    lastMessage: {
                                      type: "string",
                                      nullable: true,
                                    },
                                    messageCount: {
                                      type: "number",
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new conversation",
          description:
            "Create a new conversation with an initial chatbot message",
          tags: ["Conversations"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "Optional title for the conversation",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Conversation created successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: {
                            allOf: [
                              { $ref: "#/components/schemas/Conversation" },
                              {
                                properties: {
                                  messages: {
                                    type: "array",
                                    items: {
                                      $ref: "#/components/schemas/Message",
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/api/conversations/{id}": {
        get: {
          summary: "Get conversation by ID",
          description: "Retrieve a specific conversation with all its messages",
          tags: ["Conversations"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Conversation ID",
            },
          ],
          responses: {
            "200": {
              description: "Conversation retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: {
                            allOf: [
                              { $ref: "#/components/schemas/Conversation" },
                              {
                                properties: {
                                  messages: {
                                    type: "array",
                                    items: {
                                      $ref: "#/components/schemas/Message",
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "404": {
              description: "Conversation not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete conversation",
          description: "Delete a conversation and all its messages",
          tags: ["Conversations"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Conversation ID",
            },
          ],
          responses: {
            "200": {
              description: "Conversation deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              message: {
                                type: "string",
                                example: "Conversation deleted successfully",
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "404": {
              description: "Conversation not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/api/messages": {
        post: {
          summary: "Create a new message",
          description:
            "Send a message to a conversation. The chatbot will respond after 2 seconds.",
          tags: ["Messages"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["content", "conversationId"],
                  properties: {
                    content: {
                      type: "string",
                      description: "Message content",
                      minLength: 1,
                    },
                    conversationId: {
                      type: "string",
                      description: "ID of the conversation",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Message created successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: { $ref: "#/components/schemas/Message" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "404": {
              description: "Conversation not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/api/messages/{conversationId}": {
        get: {
          summary: "Get messages by conversation ID",
          description:
            "Retrieve all messages for a specific conversation with pagination",
          tags: ["Messages"],
          parameters: [
            {
              name: "conversationId",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Conversation ID",
            },
            {
              name: "page",
              in: "query",
              schema: {
                type: "integer",
                default: 1,
              },
              description: "Page number for pagination",
            },
            {
              name: "limit",
              in: "query",
              schema: {
                type: "integer",
                default: 50,
              },
              description: "Number of messages per page",
            },
          ],
          responses: {
            "200": {
              description: "Messages retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Message" },
                          },
                          pagination: {
                            type: "object",
                            properties: {
                              page: { type: "number" },
                              limit: { type: "number" },
                              totalCount: { type: "number" },
                              totalPages: { type: "number" },
                              hasNext: { type: "boolean" },
                              hasPrev: { type: "boolean" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "404": {
              description: "Conversation not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API files
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "ChatBot API Documentation",
    })
  );
};
