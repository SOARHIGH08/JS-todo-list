import {minDate} from "./set-min-date.js";

date.value = minDate;
date.min = minDate;

// id value
let CurrentID = localStorage.getItem("CurrentID"); 
let idNum;

if (CurrentID == null) {
    idNum = 1;
} else {
    idNum = parseInt(CurrentID) + 1;
}

// todo array
let totalTodo;
let todoItems = JSON.parse(localStorage.getItem("todo"));
desc.focus();
    
if (todoItems == null) {
    todoItems = [];
} else {
    todoItems.forEach((todoItem) => {
        let todoList = document.getElementById("todoList");
        let item = document.createElement("li");
        item.innerHTML = `${todoItem.date} <br> ${todoItem.desc} <br> <button class="del-but">Delete</button><button class="done-but">Done</button>`;
        todoList.appendChild(item);

        console.log("ON LOAD");

        let delBut = item.querySelector(".del-but");
        delBut.addEventListener("click", () => {

        //remove in display
            todoList.removeChild(item);

        //remove in local storage
            let delID = todoItem.id;

            // Filter out the object with the specified ID
            const updatedItems = todoItems.filter(todoItems => todoItems.id !== delID);

            // Update the localStorage with the updated array
            localStorage.setItem('todo', JSON.stringify(updatedItems));

            alert(`Object with ID ${delID}, will be removed.`);

            console.log("DELETE");
            desc.focus();
        });
    });
    
}

let addItem = () => {
    totalTodo = todoItems.length;
    if (totalTodo >= 500) {
        alert("You have a lot of tasks on your plate, so focus on completing those first.")
    } else {
        let todoItems = JSON.parse(localStorage.getItem("todo"));
        if (todoItems == null) {
            todoItems = [];
        }

        let desc = document.getElementById("desc");
        let date = document.getElementById("date");

        
        let inputDate = date.value;
        let parts = inputDate.split("-");
        let year = parts[0];
        let month = new Date(inputDate + 'T00:00:00').toLocaleString('default', { month: 'short' });
        let day = parseInt(parts[2], 10);

        let formattedDate = `${day} ${month} ${year}`;

        let todoItem = {
            id: idNum,
            date: formattedDate,
            desc: desc.value
        }

        todoItems.push(todoItem);

        localStorage.setItem("todo", JSON.stringify(todoItems));
        localStorage.setItem("CurrentID", idNum);
        idNum++;

        let todoList = document.getElementById("todoList");
        let item = document.createElement("li");
        item.innerHTML = `${formattedDate} <br> ${desc.value} <br> <button class="del-but">Delete</button><button class="done-but">Done</button>`;
        todoList.appendChild(item);

        console.log("ADD ITEM");
        
        // delete button
        let delBut = item.querySelector(".del-but");
        delBut.addEventListener("click", () => {
        //remove item in display
            todoList.removeChild(item);

        //remove item in local storage
            let delID = todoItem.id;

            // Filter out the object with the specified ID
            let todoItems = JSON.parse(localStorage.getItem("todo"));
            todoItems = todoItems.filter(todo => todo.id !== delID);

            // Update the localStorage with the updated array
            localStorage.setItem('todo', JSON.stringify(todoItems));

            totalTodo = todoItems.length; 
            if (totalTodo == 0) {
                console.log("NO TASK");
            } else {
                console.log("DELETE");
            }
            
            desc.focus();
            alert(`Object with ID ${delID}, will be removed.`);   
        });
        
        // done button
        let doneBut = item.querySelector(".done-but");
        doneBut.addEventListener("click", () => {
            item.style.fontStyle = "italic";
            item.style.color = "gray";
            doneBut.style.display = "none";
        });

    }

        desc.value = "";
        date.value = minDate;
        desc.focus();
}

let addBut = document.getElementById("addBut");
addBut.addEventListener("click", addItem);