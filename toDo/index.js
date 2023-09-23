const Tasks = require('./models/tasks');
const { inquirerMenu, askForTask, deleteMenu, tasksToCompleteMenu, confirmMenu } = require('./helpers/inquirer');
const { saveToDB, readFromDB } = require('./helpers/saveFile');


const main = async () => {
  let option = "";
  const tasks = new Tasks()
  const tasksDB = readFromDB();
  if (tasksDB) {
    tasksDB.forEach(task => tasks._list[task.id] = task)
  }
    
  do {
    option = await inquirerMenu();
    switch (option) {
      case "1":
        const description = await askForTask();
        tasks.addTask(description);
        break;
      case "2":
        const tasksList = tasks.getList();
        console.log('');
        tasksList.forEach((task, index) => {
          console.log(`${index + 1}. ${task.description} :: ${task.completed ? 'Completed' : 'Pending'}`);
        })
        console.log('');
        break;
      case "3":
        const tasksToComplete = await tasksToCompleteMenu(tasks.getList());
        if (tasksToComplete.length === 0) break;
        const isOK = await confirmMenu();
        if (isOK) tasksToComplete.forEach(id => tasks.updateTask(id));
        break;
      case "4":
        const idToDelete = await deleteMenu(tasks.getList());
        if (idToDelete === '0') break;
        const confirm = await confirmMenu();
        if (confirm) tasks.deleteTask(idToDelete);
        break;
      case "5":
        break;
    }

    saveToDB(tasks.getList());
  } while (option !== "5");
}

main();