import CompletedTask from './completed.js';
import Storage from './storage.js';
import Crud from './crud.js';
import EnterIcon from './enter-icon.png';
import TrashIcon from './trash-icon.png';

export default class TaskList {
    static taskList = [];

    static itemID = Number;

    static taskListContainer;

    static listInput;

    constructor() {
      TaskList.itemID = 0;

      Storage.loadFromStorage(TaskList.taskList);

      document.getElementById('enter-icon').src = EnterIcon;

      TaskList.listInput = document.getElementById('add-todo');
      TaskList.listInput.addEventListener('keyup', TaskList.addItemToList);

      TaskList.taskListContainer = document.createElement('div');

      TaskList.updateList();
    }

    static updateTaskComplete(event) {
      const checkbox = event.currentTarget;
      const listContainer = checkbox.parentElement;

      if (checkbox.checked) {
        checkbox.nextSibling.classList.add('complete');
      } else {
        checkbox.nextSibling.classList.remove('complete');
      }

      CompletedTask.updateCompleted(TaskList.taskList, listContainer.id);

      Storage.saveToStorage(TaskList.taskList);
    }

    static addItemToList(event) {
      if (event.key === 'Enter') {
        const inputText = event.currentTarget;
        const textValue = inputText.value;

        Crud.add(TaskList.taskList, textValue, TaskList.itemID);
        TaskList.itemID += 1;

        inputText.value = '';

        Storage.saveToStorage(TaskList.taskList);

        TaskList.updateList();
      }
    }

    static editItem(event) {
      const listItemChildren = event.currentTarget.parentElement.children;

      listItemChildren[1].classList.remove('enabled');
      listItemChildren[1].classList.add('disabled');

      listItemChildren[2].classList.remove('disabled');
      listItemChildren[2].classList.add('enabled');

      listItemChildren[2].focus();
    }

    static cancelEdit(event) {
      const listItemChildren = event.currentTarget.parentElement.children;

      listItemChildren[1].classList.remove('disabled');
      listItemChildren[1].classList.add('enabled');
      listItemChildren[2].classList.remove('enabled');
      listItemChildren[2].classList.add('disabled');

      listItemChildren[2].value = '';
    }

    static UpdateItem(event) {
      if (event.key === 'Enter') {
        const inputEdit = event.currentTarget;
        const itemLabel = inputEdit.parentElement.children[1];

        if (inputEdit.value !== '') {
          itemLabel.innerText = inputEdit.value;
        }

        TaskList.cancelEdit(event);

        Crud.update(TaskList.taskList, inputEdit.parentElement.id, itemLabel.innerText);

        Storage.saveToStorage(TaskList.taskList);
      }
    }

    static removeItem(event) {
      const taskItem = event.currentTarget.parentElement;

      Crud.delete(TaskList.taskList, taskItem.id);

      Storage.saveToStorage(TaskList.taskList);

      TaskList.updateList();
      TaskList.itemID -= 1;
    }

    static clearCompleted() {
      TaskList.taskList = TaskList.taskList.filter((task) => task.completed === false);

      for (let i = 0; i < TaskList.taskList.length; i += 1) {
        TaskList.taskList[i].index = i;
      }

      TaskList.itemID = TaskList.taskList.length;

      Storage.saveToStorage(TaskList.taskList);
      TaskList.updateList();
    }

    /* eslint-disable */
    get taskListComponent() {
      return TaskList.taskListContainer;
    }
    /* eslint-enable */

    static updateList() {
      TaskList.taskList.sort((a, b) => a.index - b.index);

      TaskList.taskListContainer.innerHTML = '';

      TaskList.taskList.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.classList.add('flex-list-item');
        listItem.id = task.index;

        const itemCompleted = document.createElement('input');
        itemCompleted.type = 'checkbox';
        itemCompleted.checked = task.completed;
        itemCompleted.classList.add('item-completed');
        itemCompleted.addEventListener('change', TaskList.updateTaskComplete);

        const itemDescription = document.createElement('label');
        itemDescription.innerText = task.description;
        itemDescription.classList.add('item-description');
        itemDescription.addEventListener('click', TaskList.editItem);

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.classList.add('edit-input');
        editInput.classList.add('disabled');

        editInput.addEventListener('focusout', TaskList.cancelEdit);
        editInput.addEventListener('keyup', TaskList.UpdateItem);

        const trashIcon = document.createElement('img');
        trashIcon.src = TrashIcon;
        trashIcon.classList.add('trash-icon');

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        trashButton.appendChild(trashIcon);
        trashButton.type = 'button';

        trashButton.addEventListener('click', TaskList.removeItem);

        listItem.appendChild(itemCompleted);
        listItem.appendChild(itemDescription);
        listItem.appendChild(editInput);
        listItem.appendChild(trashButton);
        TaskList.taskListContainer.appendChild(listItem);

        if (task.completed) {
          itemCompleted.nextSibling.classList.add('complete');
        }
      });

      const clearAllButton = document.createElement('button');
      clearAllButton.classList.add('clear-all-button');
      clearAllButton.innerText = 'Clear all completed';
      clearAllButton.type = 'button';
      clearAllButton.addEventListener('click', TaskList.clearCompleted);
      TaskList.taskListContainer.appendChild(clearAllButton);
    }
}