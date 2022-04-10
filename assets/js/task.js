import { getTasks } from "./api.js";


export class Task {

    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.createDate = options.createDate;
        this.status = options.status;
    }

    createTask() {
        const newTask = {
            id: Date.now(),
            name: this.name,
            createDate: this.createDate,
            status: "active"
        }
        this.addToStorage(newTask);
        this.getTaskHTML();
    }

    addToStorage(taskObj) {
        const tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksStorage.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasksStorage));
        Task.isTaskListEmpty();
        Task.getCountTasks();
    }

    getTaskHTML() {
        const tasksListWrapper = document.querySelector('.todos__body-task-list');
        const taskCard = tasksListWrapper.querySelector('[data-new-task]');
        const cloneTask = taskCard.cloneNode(true);
        const name = cloneTask.querySelector('[data-task-name]');
        const editTask = cloneTask.querySelector('[data-task-edit]');
        const deleteTask = cloneTask.querySelector('[data-task-delete]');
        const checkbox = cloneTask.querySelector('.todos__body-task-list-item-checkbox');
        const labelCheckbox = cloneTask.querySelector('.todos__body-task-list-item-title-checkbox');
        this.setTaskProps(tasksListWrapper, cloneTask, name, editTask, deleteTask, checkbox, labelCheckbox);
    }

    setTaskProps(tasksListWrapper, cloneTask, name, editTask, deleteTask, checkbox, labelCheckbox) {
        cloneTask.removeAttribute('data-new-task');
        cloneTask.dataset.taskStatus = this.status;
        cloneTask.dataset.taskId = this.id;
        name.dataset.taskName = this.name;
        name.value = this.name;
        editTask.dataset.taskEdit = this.id;
        deleteTask.dataset.taskDelete = this.id;
        checkbox.setAttribute('id', this.id);
        if(this.status === "completed") checkbox.setAttribute('checked', 'checked');
        labelCheckbox.setAttribute('for', this.id);
        this.renderTask(tasksListWrapper, cloneTask);
    }

    renderTask(tasksListWrapper, cloneTask) {
        tasksListWrapper.prepend(cloneTask);
        cloneTask.classList.remove('hidden');
    }

    static getCountTasks(sortType) {
        const tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        const countTasksWrapper = document.querySelector('[data-tasks-left]');
        if(sortType === undefined || sortType === null) {
            countTasksWrapper.innerHTML = `${tasksStorage.length} items left`;
        }
        else {
            const filteredTasks = tasksStorage.filter(task => { 
                if(task.status === sortType) return true;
            });
            countTasksWrapper.innerHTML = `${filteredTasks.length} items left`;
        }
        
    }

    static isTaskListEmpty(typeSort) {
        const tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        const emptyItem = document.querySelector('.todos__body-task-list-item.empty');
        const sortEmptyItem = document.querySelector(`.todos__body-task-list-item.empty.${typeSort}`);
        const clearOldStatusText = () => {
            let emptyItems = document.querySelectorAll('.todos__body-task-list-item.empty');
            emptyItems.forEach(item => item.classList.add('hidden'));
        }
        if(typeSort === null || typeSort === undefined) {
            clearOldStatusText();
            (tasksStorage.length !== 0) ? emptyItem.classList.add('hidden') :emptyItem.classList.remove('hidden');
        }
        else {
            let filteredTaskArr = tasksStorage.filter(task => { if(task.status === typeSort) return true;});
            clearOldStatusText();
            (filteredTaskArr.length !== 0) ? sortEmptyItem.classList.add('hidden') :sortEmptyItem.classList.remove('hidden');
        }
    }

    static sortBy(type) {
        Task.clearTaskList();
        getTasks(type);
    } 

    static clearTaskList() {
        let tasksListItems= document.querySelectorAll('.todos__body-task-list-item');
        tasksListItems.forEach((item) => {
            if(item.dataset.taskId != "null" && !item.classList.contains('empty')) {
               item.remove();
            }
        });
    }

    static updateTask(id, name) {
        let tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksStorage.forEach((task) => {
            if(task.id === parseInt(id)) {
                task.name = name;
            }
        })
        Task.updateTaskStorage(tasksStorage);
    }

    static removeTask(id) {
        let tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksStorage.forEach((task, index, array) => {
            if(task.id === parseInt(id)) {
                array.splice(index,1);
            }
        });
        Task.updateTaskStorage(tasksStorage);
        Task.isTaskListEmpty();
        Task.getCountTasks();
    }

    static updateTaskStorage(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    static clearStorage() {
        localStorage.setItem('tasks', null);
        Task.clearTaskList();
        Task.isTaskListEmpty();
    }

    static changeStatus(id, status) {
        let tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksStorage.forEach(task => {
            if(task.id === parseInt(id)) {
                task.status = status;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasksStorage));
    }

}




