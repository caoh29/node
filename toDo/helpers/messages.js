async function displayMenu() {
  console.clear();
  console.log("Welcome to the To Do List");
  console.log("=========================");
  console.log("1. Add a new task");
  console.log("2. List all tasks");
  console.log("3. Mark a task as complete");
  console.log("4. Delete a task");
  console.log("5. Exit");
  console.log("=========================");
}

const askForTask = () => {
  return new Promise((resolve, reject) => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const option = readLine.question('Please select an option: ', (option) => {
      readLine.close();
      resolve(option);
    });
  });
}

module.exports = {
  displayMenu,
  askForTask,
};