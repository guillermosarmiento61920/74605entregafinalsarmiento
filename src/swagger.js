import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi Aplicacion de NodeJS para el proyecto AdoptMe",
      version: "1.0.0",
      description: "Documentacion para mostrar mis Endpoints",
      termsOfService: "https://mi-dominio.com/terminos",
      contact: {
        name: "Equipo de Desarrollo Backend",
        url: "https://mi-dominio.com",
        email: "contacto@mi-dominio.com",
      },
      license: {
        name: "MIT",
        url: "httpss://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
      {
        url: "https://mi-dominio.com",
        description: "Servidor de Produccion",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpect = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpect));
};
