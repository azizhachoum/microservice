const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const Database = require('./src/databse/database.service');
const EmployeeService = require('./src/services/employee.service');
const EmployeeRepository = require('./src/repositories/employee.repository');
const { EmployeeController, employeeRoutes } = require('./src/presentation/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors")

// Initialise l'application Express
const app = express();
app.use(cors())

// Parse les requêtes en JSON
app.use(bodyParser.json());

// Initialise la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
  const db = await new Database(config.databaseUrl).connect();

  // Initialise le repository des employés
  const employeeRepository = new EmployeeRepository(db.employeeModel);

  // Initialise le service des employés
  const employeeService = new EmployeeService(employeeRepository);

  // Initialise le controller des employés
  const employeeController = new EmployeeController(employeeService);

  // Initialise les routes de l'API */

  app.get('/employees', employeeController.getAll.bind(employeeController));
  app.get('/employees/:id', employeeController.getById.bind(employeeController));
  //index.js
  app.post('/employees', employeeController.create.bind(employeeController));
  app.put('/employees/:id', employeeController.update.bind(employeeController));
  app.delete('/employees/:id', employeeController.delete.bind(employeeController));

  // Ecoute les requêtes HTTP sur le port spécifié
  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
}

startServer();
