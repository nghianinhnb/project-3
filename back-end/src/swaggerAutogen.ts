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

const options = {
    // openapi: '3.0.0',          // Enable/Disable OpenAPI. By default is null
    // language: <string>,         // Change response language. By default is 'en-US'
    // // disableLogs: true,     // Enable/Disable logs. By default is false
    // autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
    // autoQuery: true,       // Enable/Disable automatic query capture. By default is true
    // autoBody: true,         // Enable/Disable automatic body capture. By default is true
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
    await import('./index');
});