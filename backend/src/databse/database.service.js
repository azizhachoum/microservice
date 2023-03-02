//database.service.js

const mongoose = require('mongoose');

class Database {
  constructor(url) {
    this.url = url;
    this.employeeModel = null;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, { useNewUrlParser: true });
      console.log('Connected to database.');

      // Initialise le modèle Employee
      const employeeSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String
      });
      this.employeeModel = mongoose.model('Employee', employeeSchema);
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
    }
    
    return this;
  }

  disconnect() {
    mongoose.disconnect();
  }
}

module.exports = Database;