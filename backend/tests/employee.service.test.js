// employee.service.test.js

const EmployeeRepository = require('../src/repositories/employee.repository');
const EmployeeService = require('../src/services/employee.service');

describe('EmployeeService', () => {
  describe('getAll', () => {
    it('should return all employees as DTOs', async () => {
      // Arrange
      const employeeRepository = new EmployeeRepository();
      const employeeService = new EmployeeService(employeeRepository);

      const employees = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
      ];

      jest.spyOn(employeeRepository, 'getAll').mockResolvedValue(employees);

      // Act
      const result = await employeeService.getAll();

      // Assert
      expect(result).toEqual([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
      ]);
    });
  });
});
