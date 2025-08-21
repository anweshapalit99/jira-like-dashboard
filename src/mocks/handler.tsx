import { http as rest } from "msw";

export const handlers = [
  // Status endpoint
  rest.get("http://localhost:3001/status", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "todo", value: "To Do", children: [] },
        { id: "in-progress", value: "In Progress", children: [] },
        { id: "done", value: "Done", children: [] },
      ])
    );
  }),

  // Tasks endpoint
  rest.get("http://localhost:3001/tasks", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "1",
          title: "Test Task",
          description: "Test Description",
          status: "todo",
          userId: "1",
          categoryId: "cat1",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
      ])
    );
  }),

  // Users endpoint
  rest.get("http://localhost:3001/users", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "1",
          email: "test@example.com",
          name: "Test User",
          role: "developer",
          isActive: true,
        },
      ])
    );
  }),
];
