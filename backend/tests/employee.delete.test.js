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

describe('delete', () => {
it('should delete an existing employee and return the deleted employee', async () => {
const employee = {
id: '123',
firstName: 'John',
lastName: 'Doe',
email: 'john.doe@example.com'
};
mockEmployeeRepository.getById.mockResolvedValue(employee);
mockEmployeeRepository.delete.mockResolvedValue(employee);

const deletedEmployee = await employeeService.delete('123');

expect(mockEmployeeRepository.getById).toHaveBeenCalledWith('123');
expect(mockEmployeeRepository.delete).toHaveBeenCalledWith('123');
expect(deletedEmployee).toEqual({
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
});

it('should throw an error if the employee does not exist', async () => {
mockEmployeeRepository.getById.mockResolvedValue(null);

await expect(employeeService.delete('123')).rejects.toThrow('Employee not found');

expect(mockEmployeeRepository.getById).toHaveBeenCalledWith('123');
expect(mockEmployeeRepository.delete).not.toHaveBeenCalled();
});

});
});