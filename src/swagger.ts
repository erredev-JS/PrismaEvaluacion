import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API con Express y TypeScript",
    version: "1.0.0",
    description: "Documentación generada con swagger-jsdoc",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // ruta a tus archivos con anotaciones JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ⚠️ Exportar a archivo, descomentar solo si queremos actualizar la docs

// import fs from 'fs'
// fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2))
