const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Event Manager',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          Bearer: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{
        Bearer: []
      }],
    },
    apis: ['src/routes/usersRoutes.js', 'src/routes/eventsRoutes.js', 'src/routes/assistanceRoutes.js'], // ruta a los archivos donde has definido los endpoints
  };


  
const swaggerSpec = swaggerJSdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req,res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log( `Docs are avaliable at http://localhost:${port}/api/docs`)
}

module.exports = {
    swaggerDocs
};