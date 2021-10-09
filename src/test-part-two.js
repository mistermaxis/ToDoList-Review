export const update = (taskList, index, newDescription) => {
  const idx = parseInt(index, 10);

  taskList[idx].description = newDescription;
};

export const updateCompleted = (taskList, index) => {
  const idx = parseInt(index, 10);

  taskList[idx].completed = !(taskList[idx].completed);
};

export const clearAll = (tasklist) => {
  tasklist = tasklist.filter((task) => task.completed === false);

  for (let i = 0; i < tasklist.length; i += 1) {
    tasklist[i].index = i;
  }
  return tasklist;
};
