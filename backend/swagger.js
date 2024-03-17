const swaggerAutogen = require('swagger-autogen')();
// requiring path and fs modules
const outputFile = './swagger_output.json';
const routes = 'src/routes';
const sw = swaggerAutogen(outputFile, [`${routes}/index.js`]);
