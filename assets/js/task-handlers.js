import {Task} from './task.js';

const tasksListWrapper = document.querySelector('.todos__body-task-list');

export const createTaskHandler = () => {
    const inputTask = document.getElementById('inputTask');
    inputTask.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (event.target.value != '') {
                const taskObj = {
                    id: Date.now(),
                    name: this.value,
                    createDate: Date.now(),
                    status: "active"
                }
                const newTask = new Task(taskObj);
                newTask.createTask();
                inputTask.value = '';
            }
        }
    });
}

export const editTaskHandler = () => {

    const acceptChangeTask = (element) => {
        const taskCard = element.closest('.todos__body-task-list-item');
        const id = taskCard.getAttribute('data-task-id');
        const name = element.value;
        element.setAttribute('disabled', 'disabled');
        Task.updateTask(id, name);
    }

    tasksListWrapper.addEventListener('click', (event) => {
        let editIcon = event.target.closest('[data-task-edit]');
        if(editIcon) {
            let taskCard = editIcon.closest('.todos__body-task-list-item');
            let taskInput = taskCard.querySelector('.todos__body-task-list-item-name')
            taskInput.removeAttribute('disabled');
            taskInput.focus();

        }
    });

    tasksListWrapper.addEventListener('keyup', (event) => {
        let editInput = event.target.closest('.todos__body-task-list-item-name');
        if(editInput) {
            if(event.key === 'Enter') {
                acceptChangeTask(editInput);
            }
        }
    });
    
    document.addEventListener('focusout', (event) => {
        let editInput = event.target.closest('.todos__body-task-list-item-name');
        if(editInput) {
            acceptChangeTask(editInput);
        }
    });
}

export const deleteTaskHandler = () => {
    tasksListWrapper.addEventListener('click', (event) => {
        let deleteIcon = event.target.closest('[data-task-delete]');
        if(deleteIcon) {
            let taskID = deleteIcon.getAttribute('data-task-delete');
            let taskCard = deleteIcon.closest('.todos__body-task-list-item');
            taskCard.remove();
            Task.removeTask(taskID);
        }
    });
}

export const changeStatus = () => {
    tasksListWrapper.addEventListener('click', (event) => {
        let checkbox = event.target.closest('.todos__body-task-list-item-title-checkbox');
        if(checkbox) {
            const taskCard = checkbox.closest('.todos__body-task-list-item');
            const id = taskCard.getAttribute('data-task-id');
            const STATUS = {
                0: 'active',
                1: 'completed'
            }
            let taskCardStatus = taskCard.getAttribute('data-task-status');
            (taskCardStatus === "active") ? taskCard.dataset.taskStatus = STATUS[1] : taskCard.dataset.taskStatus = STATUS[0];
            let newTaskCardStatus = taskCard.getAttribute('data-task-status');
            Task.changeStatus(id, newTaskCardStatus);
        }
    });
}

export const clearStorage = () => {
    const clearBtn = document.querySelector('.todos__bottom-clear-complited');
    clearBtn.addEventListener('click', () => {
        Task.clearStorage();
    })
}



