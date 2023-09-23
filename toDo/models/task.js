const { v4: uuidv4 } = require('uuid');

class Task {
  id = '';
  description = '';
  completed = false;

  constructor(description) {
    this.id = uuidv4(); // Generate a random id for each task.
    this.description = description;
    this.completed = false;
  }
}

module.exports = Task;