import Task from './task.js';

export const add = (taskList, inputText, index) => {
  const newTask = new Task(inputText, false, index);
  taskList.push(newTask);
};

export const remove = (taskList, index) => {
  const idx = parseInt(index, 10);

  taskList.splice(idx, 1);

  for (let i = 0; i < taskList.length; i += 1) {
    taskList[i].index = i;
  }
};
