// employee.service.interface.js

class EmployeeServiceInterface {
    async getAll() {
      throw new Error('Not implemented');
    }
  
    async create(employeeDTO) {
      throw new Error('Not implemented');
    }
  
    async delete(id) {
      throw new Error('Not implemented');
    }
  
    async update(id, employeeDTO) {
      throw new Error('Not implemented');
    }
  
    async getById(id) {
      throw new Error('Not implemented');
    }
  }
  
  module.exports = EmployeeServiceInterface;
  