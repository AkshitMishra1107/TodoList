let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let completedList = JSON.parse(localStorage.getItem('completedList')) || [];
let importantList = JSON.parse(localStorage.getItem('importantList')) || [];

function saveData() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
    localStorage.setItem('importantList', JSON.stringify(importantList));
}
function runTodo() {
    let todoHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        const html = `<div class="taskItem">
            <button class="Done" onclick="addCompleted(${i})"></button>
            <span class="todoItem">${todo}</span>
            <button class="imp" onclick="addImportant(${i})">&#9734;</button>
        </div>`;
        todoHTML += html;
    }
    document.querySelector('.Tasks').innerHTML = todoHTML;
}

function runCompleted() {
    let completedHTML = '';
    for (let i = 0; i < completedList.length; i++) {
        const completed = completedList[i];
        const html = `<div class="taskItem">
            <button class="Done Undo" onclick="addBackToTodo(${i})"></button>
            <span>${completed}</span>
        </div>`;
        completedHTML += html;
    }
    document.querySelector('.completedTasks').innerHTML = completedHTML;
}
function runImportant() {
    let importantHTML = '';
    for (let i = 0; i < importantList.length; i++) {
        const important = importantList[i];
        const html = `<div class="taskItem">
            <button class="Done" ></button>
            <span>${important}</span>
            <button class="imp">&#9734;</button>
        </div>`;
        importantHTML += html;
    }
    document.querySelector('.importantTasks').innerHTML = importantHTML;
}
function addTodo() {
    const input = document.querySelector('.input-text');
    const element = input.value;
    if (element) {
        todoList.push(element);
        input.value = '';
        saveData();
        runTodo();
        // resetAllData();
    }
}
function addBackToTodo(index) {
    const item = completedList[index];
    todoList.push(item);
    completedList.splice(index, 1);
    saveData();
    runTodo();
    runCompleted();
}

function addCompleted(index) {
    const completedItem = todoList[index];
    completedList.push(completedItem);
    todoList.splice(index, 1);
    importantList.splice(index, 1);
    saveData();
    runTodo();
    runCompleted();
}
function addImportant(index) {
    const importantItem = todoList[index];
    if (!importantList.includes(importantItem)) {
        importantList.push(importantItem);
        saveData();
        runImportant();
    }
}
// function resetAllData() {
//     const confirmReset = confirm("Are you sure you want to delete all your tasks?");
//     if (!confirmReset) return;

//     // Clear localStorage
//     localStorage.removeItem('todoList');
//     localStorage.removeItem('completedList');
//     localStorage.removeItem('importantList');

//     // Reset in-memory lists
//     todoList = [];
//     completedList = [];
//     importantList = [];

//     // Refresh UI
//     runTodo();
//     runCompleted();
//     runImportant();
// }
window.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.Tasks')) runTodo();
    if (document.querySelector('.completedTasks')) runCompleted();
    if (document.querySelector('.importantTasks')) runImportant();
});
