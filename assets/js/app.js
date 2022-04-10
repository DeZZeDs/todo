import { getTasks } from "./api.js";
import { createTaskHandler, deleteTaskHandler, editTaskHandler, clearStorage, changeStatus } from "./task-handlers.js";
import {toggleTaskList} from "./toggle-task-list.js";

getTasks();


const DOMLoaded = () => {
    const initApp = () => {
        createTaskHandler();
        deleteTaskHandler();
        editTaskHandler();
        toggleTaskList();
        clearStorage();
        changeStatus();
    }
    initApp();

}

document.addEventListener('DOMContentLoaded', DOMLoaded);