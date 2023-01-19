import swaggerAutogen from 'swagger-autogen'


const outputFile = "./swagger.json"

const endpointsFiles = ["src/app.ts"]

const doc = {
    info: {
        title: 'Project 3 Backend',
        description: 'E-Sign',
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc)
