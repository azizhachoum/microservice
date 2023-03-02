const EmployeeService = require('../src/services/employee.service');

describe('EmployeeService', () => {
let mockEmployeeRepository;
let employeeService;

beforeEach(() => {
mockEmployeeRepository = {
getById: jest.fn(),
create: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
getAll: jest.fn()
};
employeeService = new EmployeeService(mockEmployeeRepository);
});

describe('update', () => {
it('should update an existing employee and return the updated employee', async () => {
const existingEmployee = {
id: '123',
firstName: 'John',
lastName: 'Doe',
email: 'john.doe@example.com'
};
const updatedEmployee = {
id: '123',
firstName: 'Jane',
lastName: 'Doe',
email: 'jane.doe@example.com'
};
mockEmployeeRepository.getById.mockResolvedValue(existingEmployee);
mockEmployeeRepository.update.mockResolvedValue(updatedEmployee);
const result = await employeeService.update('123', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com'
  });

  expect(mockEmployeeRepository.getById).toHaveBeenCalledWith('123');
  expect(mockEmployeeRepository.update).toHaveBeenCalledWith('123', {
    id: '123',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com'
  });
  expect(result).toEqual({
    id: '123',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com'
  });
});

it('should throw an error if the employee does not exist', async () => {
  mockEmployeeRepository.getById.mockResolvedValue(null);

  await expect(employeeService.update('123', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com'
  })).rejects.toThrow('Employee not found');

  expect(mockEmployeeRepository.getById).toHaveBeenCalledWith('123');
  expect(mockEmployeeRepository.update).not.toHaveBeenCalled();
});
});
});
