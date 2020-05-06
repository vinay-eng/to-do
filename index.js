let input = document.getElementById('item'); // Input Value
let button = document.getElementById('add'); // Add Button
let ol = document.getElementById('list'); // Ordered List <ol>
let clear = document.getElementById('clear'); // Clear All Button
let search = document.getElementById('search'); // Search Input

//toDo Count
toDoCount = () => {
    document.getElementById('count').innerHTML = `ToDo Count: ${ol.children.length}`;
};

// Add ToDo List
let addToDo = () => {
    if(input.value === '') {
        alert('toDo is Empty');
    } else {
        if(input.value.length <= 20) {
            ol.innerHTML += `
                <li class="toDoItem">
                    <a class="text">${input.value}</a>
                    <span class="edit">Edit</span>
                    <span class="remove">Remove</span>
                </li>
            `;
            localStorage["toDoItems"] = ol.innerHTML;
        } else {
            alert('Max Length is 20');
        }
    };

    input.value = '';
    toDoCount();
};

// Add ToDoList On Enter KeyCode
let enterPress = e => {
    if(e.keyCode === 13) {
        addToDo();
    };
};

// Remove ToDo
let removeToDo = e => {
    if(e.target.className === 'remove') {
        e.target.parentElement.remove();
        localStorage["toDoItems"] = ol.innerHTML
    };
    toDoCount();
};

if (localStorage["toDoItems"]) {
    ol.innerHTML = localStorage["toDoItems"];
  }

// Edit Todo
let editToDo = e => {
    if(e.target.className === 'edit') {
        let text = prompt('Edit Text');
        if(text === '') {
            alert('Can\'t Edit With Empty Prompt');
        } else if(text === null) {
            return;
        } else {
            e.target.parentElement.children[0].textContent = text;
            localStorage["toDoItems"] = ol.innerHTML
        }
    };
};

// Clear ToDo List
let clearToDo = () => {
    while(ol.firstChild) {
        ol.removeChild(ol.lastChild);
        localStorage["toDoItems"] = ol.innerHTML
    };
    toDoCount();
};

// Checked ToDo
let checkedToDo = e => {
    if(e.target.classList.contains('text')) {
        e.target.classList.toggle('checked')
    };
};

// Filter ToDos
let searchToDo = e => {
    let list = document.getElementsByClassName('toDoItem');
    let text = e.target.value.toLowerCase();

    for(let i = 0; i < list.length; i++) {
        if(list[i].children[0].textContent.toLowerCase().indexOf(text) != -1) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        };
    };
};


// Event Listeners
button.addEventListener('click', addToDo);
input.addEventListener('keyup', enterPress);
ol.addEventListener('click', removeToDo);
ol.addEventListener('click', editToDo);
ol.addEventListener('click', checkedToDo);
clear.addEventListener('click', clearToDo);
search.addEventListener('keyup', searchToDo);
