const Task = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  addTask(description) {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  getList() {
    return Object.keys(this._list).map((key) => this._list[key]);
  }

  updateTask(id) {
    this._list[id] = {
      ...this._list[id],
      completed: true,
    };
  }
}

module.exports = Tasks;