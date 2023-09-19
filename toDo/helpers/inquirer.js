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
        name: '3. Mark a task as complete',
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
  // console.clear();
  console.log('==========================');
  console.log('  Select an option  ');
  console.log('==========================\n');
  const { option } = await inquirer.prompt(menuOptions);
  return option;
}

module.exports = {
  inquirerMenu
}