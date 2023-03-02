const EmployeeService = require('../src/services/employee.service');
const Employee = require('../src/core/entities/employee.entity');
const EmployeeDTO = require('../src/core/dtos/employee.dto');

describe('EmployeeService', () => {
  let employeeService;
  let employeeRepositoryMock;

  beforeEach(() => {
    employeeRepositoryMock = {
      getAll: jest.fn(),
      create: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    employeeService = new EmployeeService(employeeRepositoryMock);
  });

  describe('create', () => {
    it('should create an employee', async () => {
      // Arrange
      const employeeDTO = new EmployeeDTO(null, 'John', 'Doe', 'john.doe@example.com');
      const employee = new Employee(null, 'John', 'Doe', 'john.doe@example.com');
      const createdEmployee = new Employee(1, 'John', 'Doe', 'john.doe@example.com');
      employeeRepositoryMock.create.mockResolvedValue(createdEmployee);

      // Act
      const result = await employeeService.create(employeeDTO);

      // Assert
      expect(result.id).toBe(1);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.email).toBe('john.doe@example.com');
      expect(employeeRepositoryMock.create).toHaveBeenCalledWith(employee);
    });
  });
});
