import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { Application, Express } from "express";

export const setupSwagger = (app: Application) => {
  const swaggerPath = path.join(process.cwd(), "docs/swagger.yaml");

  const swaggerDocument = YAML.load(swaggerPath);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log("📖 Swagger UI running at /api-docs");
};