class Employee {
  constructor(_id, firsName, lastName, email) {
    this._id =_id;
    this.firsName = firsName;
    this.lastName = lastName;
    this.email = email;
  }
}

class EmployeeDto {
  constructor(_id, firsName, lastName, email) {
    this._id =_id;
    this.firsName = firsName;
    this.lastName = lastName;
    this.email = email;
  }
}


module.exports = {
  Employee,
  EmployeeDto,
};

