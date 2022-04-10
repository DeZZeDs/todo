import {Task} from './task.js';
export const getTasks = async (sortType) => {
    const tasksArray = await JSON.parse(localStorage.getItem('tasks')) || [];
    if(tasksArray.length !== 0 && sortType === undefined || sortType === null) {
        tasksArray.map((task) => {
            const newTask = new Task(task);
            newTask.getTaskHTML();
        });
    }
    else if(sortType) {
        tasksArray.filter((task) => {
            if(task.status === sortType) {
                const newTask = new Task(task);
                newTask.getTaskHTML();
            }
        });
    }
    else {
        Task.isTaskListEmpty();
    }
    Task.getCountTasks(sortType);
}

