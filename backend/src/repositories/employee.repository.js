const Employee = require('../core/entities/employee.entity');

class EmployeeRepository {
constructor(employeeModel) {
this.employeeModel = employeeModel;
}

async getAll() {
return this.employeeModel.find();
}
//employee.repository.js
async create(employee) {
const createdEmployee = await this.employeeModel.create(employee);
return new Employee(createdEmployee.id, createdEmployee.firstName, createdEmployee.lastName, createdEmployee.email);
}

async delete(id) {
return this.employeeModel.findByIdAndDelete(id);
}

async update(id, employee) {
const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
id,
{ ...employee },
{ new: true }
);
return new Employee(updatedEmployee.id, updatedEmployee.firstName, updatedEmployee.lastName, updatedEmployee.email);
}

async getById(id) {
const employee = await this.employeeModel.findById(id);
return new Employee(employee.id, employee.firstName, employee.lastName, employee.email);
}
}

module.exports = EmployeeRepository;