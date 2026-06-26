import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vestígios RPG — YouTube API",
      version: "1.0.0",
      description:
        "API que inspeciona o canal do YouTube do Vestígios RPG e retorna os vídeos cacheados. Documentação interativa para testar os endpoints.",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
