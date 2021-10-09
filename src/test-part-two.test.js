import { update, updateCompleted, clearAll } from './test-part-two.js';

let taskList = [{ description: 'Old Description', completed: false, index: 0 }];

describe('Update description, update completed and clear all functions', () => {
  test('Update function', () => {
    // Arrange
    const newDescription = 'New Description';
    const index = 0;

    // Act
    update(taskList, index, newDescription);

    // Assert
    expect(taskList[0].description).toStrictEqual(newDescription);
  });

  test('Update Completed function', () => {
    // Arrange
    const index = 0;

    // Act
    updateCompleted(taskList, index);

    // Assert
    expect(taskList[index].completed).toBe(true);
  });

  test('Clear All function', () => {
    // Arrange
    taskList = [{ description: 'Old Description', completed: false, index: 0 },
      { description: 'Old Description', completed: true, index: 0 },
      { description: 'Old Description', completed: true, index: 0 },
      { description: 'Old Description', completed: false, index: 0 },
    ];

    // Act
    taskList = clearAll(taskList);

    // Assert
    expect(taskList.length).toBe(2);
  });
});