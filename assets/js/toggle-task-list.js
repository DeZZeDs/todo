import {Task} from "./task.js";

export const toggleTaskList = () => {
    const taskListItems = document.querySelectorAll('.todos__bottom-navigation-item');

    const clearActiveItems = () => {
        taskListItems.forEach((item) => item.classList.remove('active'));
    }

    for(const taskListItem of taskListItems) {
        taskListItem.addEventListener('click', (event) => {
            clearActiveItems();
            let typeSort = event.target.getAttribute('data-tasks-category');
            event.target.classList.add('active');
            (typeSort === "all") ? typeSort = null : typeSort = typeSort;
            Task.sortBy(typeSort);
            Task.getCountTasks(typeSort);
            Task.isTaskListEmpty(typeSort);
        });
    }
}