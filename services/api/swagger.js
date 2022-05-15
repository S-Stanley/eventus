const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Eventus API',
    },
    host: 'localhost:3042',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['server.ts', 'routes/Users.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);