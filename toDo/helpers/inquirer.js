const inquirer = require('inquirer');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [
      {
        name: '1. Add a new task',
        value: '1'
      },
      {
        name: '2. List all tasks',
        value: '2'
      },
      {
        name: '3. Mark task(s) as complete',
        value: '3'
      },
      {
        name: '4. Delete a task',
        value: '4'
      },
      {
        name: '5. Exit',
        value: '5'
      },
    ]
  }
]

const inquirerMenu = async () => {
  console.log('==========================');
  console.log('To Do App');
  console.log('==========================');
  console.log('Select an option');
  console.log('==========================\n');
  const { option } = await inquirer.prompt(menuOptions);
  return option;
}

const askForTask = async () => {
  const input = await inquirer.prompt({
    type: "input",
    name: "description",
    message: "Enter task description: ",
    validate(value) {
      if (value.length === 0) {
        return "Please enter a value";
      }
      return true;
    }
  });
  return input.description;
};

const deleteMenu = async (tasks) => {
  console.log('==========================');
  console.log('To Do App');
  console.log('==========================');
  console.log('Delete a task');
  console.log('==========================\n');
  const { taskId } = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'taskId',
        message: 'Select a task to Delete',
        choices: [
          {
            name: '0. Cancel',
            value: '0'
          },
          ...tasks.map((task, index) => {
            return {
              name: `${index + 1}. ${task.description} :: ${task.completed ? 'Completed' : 'Pending'}`,
              value: task.id
            }
          })
        ],
      }
    ]
  );
  return taskId;
}

const tasksToCompleteMenu = async (tasks) => {
  console.log('==========================');
  console.log('To Do App');
  console.log('==========================');
  console.log('Tasks to complete');
  console.log('==========================\n');
  const { tasksIds } = await inquirer.prompt(
    [
      {
        type: 'checkbox',
        name: 'tasksIds',
        message: 'Select one or more tasks to mark as completed',
        choices: tasks.filter((task) => task.completed === false).map((task) => {
          return {
            name: task.description,
            value: task.id
          }
        })
      }
    ]
  );
  return tasksIds;
}

const confirmMenu = async () => {
  const { ok } = await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message: "Are you sure?",
  });
  return ok;
};

module.exports = {
  inquirerMenu,
  askForTask,
  deleteMenu,
  tasksToCompleteMenu,
  confirmMenu
}