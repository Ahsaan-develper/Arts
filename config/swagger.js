import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arts API",
      version: "1.0.0",
      description: "API documentation for artinthemiddle.com",
    },
    servers: [
      {
        url: "https://arts-ruddy.vercel.app",
        description: "Production",
      },
      {
        url: "http://localhost:5000",
        description: "Local",
      },
    ],
  },
  apis: ["./routes/swagger.routes.js"], // reads comments from your route files
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };