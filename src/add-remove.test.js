import { add, remove } from './add-remove';
import Task from './task';

const taskList = [];
const description = 'Test Description';

describe('Add and Remove Functions', () => {
    test('Add Function', () => {
        //Arrange
        const index = 0;
        const task = new Task(description, false, index);

        //Act
        add(taskList, description, index);

        //Assert
        expect(taskList[0]).toStrictEqual(task);
    });

    test('Remove Function', () => {
        //Arrange
        const index = 0;

        //Act
        remove(taskList, index);
        
        expect(taskList.length).toBe(0);
    })
});