// controllers/employee.controller.js

const EmployeeService = require('../../services/employee.service');
const Employee = require('../../core/entities/employee.entity')
class EmployeeController {
constructor(employeeService) {
this.employeeService = employeeService;
}

async getAll(req, res) {
try {
const employees = await this.employeeService.getAll();
res.send(Array.isArray(employees) ? employees : []);
console.log(employees)
} catch (error) {
console.log(error.message);
res.status(500).send(`Error: ${error.message}`);
}
}

//employee.contoller.js
async create(req, res) {
try {
const { _id, firstName, lastName, email } = req.body;
const createdEmployee = await this.employeeService.create(new Employee(_id, firstName, lastName, email));
res.send(createdEmployee);
console.log(createdEmployee)
} catch (error) {
console.log(error.message);
res.status(500).send(error.message);
}
}

async delete(req, res) {
try {
const deletedEmployee = await this.employeeService.delete(req.params.id);
console.log(deletedEmployee)
res.send(deletedEmployee);
} catch (error) {
console.log(error.message);
res.status(500).send(error.message);
}
}

async update(req, res) {
try {
const { _id, firstName, lastName, email } = req.body;
const updatedEmployee = await this.employeeService.update(req.params.id, new Employee(_id, firstName, lastName, email));
res.send(updatedEmployee);
} catch (error) {
console.log(error.message);
res.status(500).send(error.message);
}
}

async getById(req, res) {
try {
const employee = await this.employeeService.getById(req.params.id);
if (!employee) {
return res.status(404).json({ message: 'Employer not found' });
}
res.json(employee);
} catch (error) {
console.error(error.message);
res.status(500).send('Server Error');
}
}
}

module.exports = EmployeeController;