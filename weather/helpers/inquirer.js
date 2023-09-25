const inquirer = require('inquirer');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [
      {
        name: '1. Find a city',
        value: '1'
      },
      {
        name: '2. History',
        value: '2'
      },
      {
        name: '0. Exit',
        value: '0'
      },
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();
  console.log('==========================');
  console.log('       Weather App        ');
  console.log('==========================');
  const { option } = await inquirer.prompt(menuOptions);
  return option;
}

const askForInput = async (message) => {
  const input = await inquirer.prompt({
    type: "input",
    name: "response",
    message,
    validate(value) { return value.length === 0 ? "Please enter a value" : true },
  });
  return input.response;
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

const pause = async () => {
  await inquirer.prompt({
    type: "input",
    name: "pause",
    message: `Press ENTER to continue`,
  });
}

module.exports = {
  inquirerMenu,
  askForInput,
  deleteMenu,
  tasksToCompleteMenu,
  confirmMenu,
  pause
}