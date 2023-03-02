// employee.service.js

const Employee = require('../core/entities/employee.entity');
const EmployeeDTO = require('../core/dtos/employee.dto');
const EmployeeServiceInterface = require('../interfaces/employee.service.interface');

class EmployeeService extends EmployeeServiceInterface {
  constructor(employeeRepository) {
    super();
    this.employeeRepository = employeeRepository;
  }

  async getAll() {
    const employees = await this.employeeRepository.getAll();
    return employees.map(employee => new EmployeeDTO(employee.id, employee.firstName, employee.lastName, employee.email));
  }

  // employee.service.js
  async create(employeeDTO) {
    const employee = new Employee(employeeDTO.id, employeeDTO.firstName, employeeDTO.lastName, employeeDTO.email);
    const createdEmployee = await this.employeeRepository.create(employee);
    return new EmployeeDTO(createdEmployee.id, createdEmployee.firstName, createdEmployee.lastName, createdEmployee.email);
  }

  async delete(id) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    await this.employeeRepository.delete(id);
    return new EmployeeDTO(employee.id, employee.firstName, employee.lastName, employee.email);
  }

  async update(id, employeeDTO) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    const updatedEmployee = new Employee(id, employeeDTO.firstName, employeeDTO.lastName, employeeDTO.email);
    await this.employeeRepository.update(id, updatedEmployee);
    return new EmployeeDTO(updatedEmployee.id, updatedEmployee.firstName, updatedEmployee.lastName, updatedEmployee.email);
  }

  async getById(id) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return new EmployeeDTO(employee.id, employee.firstName, employee.lastName, employee.email);
  }
}

module.exports = EmployeeService;
