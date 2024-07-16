const usersSchema = {
  "/users": {
    type: "object",
    properties: {
      nome: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
      nivel: { type: "number", minimum: 1, maximum: 5 },
    },
    required: ["nome", "email", "password", "nivel"],
    additionalProperties: false,
  },

  "/login": {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
  },
  "/users/:id": {
    type: "object",
    properties: {
      id: { type: ["string", "number"] },
    },
    required: ["id"],
    additionalProperties: false,
  },
  "/users/:id/put": {
    type: "object",
    properties: {
      id: { type: ["string", "number"] },
      nome: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
      nivel: { type: "number", minimum: 1, maximum: 5 },
    },
    required: ["id", "nome", "email", "password", "nivel"],
    additionalProperties: false,
  },
};

export default usersSchema;
