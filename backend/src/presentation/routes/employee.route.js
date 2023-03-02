//routes/employee.route.js

const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const EmployeeService = require('../../services/employee.service');
const EmployeeRepository = require('../../repositories/employee.repository');
const Employee = require('../../core/entities/employee.entity');
const employeeModel = require('../../models/employee.model');
const employeeRepository = new EmployeeRepository(employeeModel);
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

router.get('/', (req, res) => employeeController.getAll(req, res));
router.post('/', (req, res) => employeeController.create(req, res));
router.delete('/:id', (req, res) => employeeController.delete(req, res));
router.put('/:id', (req, res) => employeeController.update(req, res));
router.get('/:id', (req, res) => employeeController.getById(req, res));

module.exports = router;