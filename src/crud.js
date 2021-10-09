import Task from './task.js';

export default class Crud {
  static add(taskList, inputText, index) {
    const newTask = new Task(inputText, false, index);
    taskList.push(newTask);
  }

  static remove(taskList, index) {
    const idx = parseInt(index, 10);

    taskList.splice(idx, 1);

    for (let i = 0; i < taskList.length; i += 1) {
      taskList[i].index = i;
    }
  }

  static update(taskList, index, newDescription) {
    const idx = parseInt(index, 10);

    taskList[idx].description = newDescription;
  }

  static clearAll(tasklist) {
    
    tasklist = tasklist.filter((task) => task.completed === false);
  
    for (let i = 0; i < tasklist.length; i += 1) {
        tasklist[i].index = i;
    }
    return tasklist;
  }
}