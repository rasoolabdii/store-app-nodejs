const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
    const swaggerDocument = swaggerJSDoc({
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Project Store",
                description: "Project Store",
                version: "1.0.0"
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    }
                }
            },
            security: [{ BearerAuth: [] }]
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDocument , {});
    app.use("/swagger" , swaggerUi.serve , swagger)
};
module.exports = SwaggerConfig;