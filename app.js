const addTodo = document.querySelector("#new-Todo");
const addBtn = document.querySelector("#add-todo");
const todoSearch = document.querySelector("#search");
const clearTodos = document.querySelector("#clear-Btn");
const todoList = document.querySelector("#todo-List");
const firstDiv = document.getElementById("to-Add");







runEvents();



function runEvents() {
  addBtn.addEventListener("click", addTodos);
  todoList.addEventListener("click", removeTodoToUI);
  todoSearch.addEventListener("keyup", filter);
  clearTodos.addEventListener("click", clearTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded)
}




function addTodos() {
  let value = addTodo.value.trim();

  if (value === null || value === "") {

    showAlert("issue", "boş")
  }
  else {
    addTodoToUI(value)
    addTodoToStorage(value)
    showAlert("success", "Added")
  }
}


function addTodoToUI(todo) {


  const span = document.createElement("span");
  span.textContent = todo

  const li = document.createElement("li");
  li.className = "todo-Element";
  // li.textContent = todo;

  const i = document.createElement("i");
  i.className = "fas fa-trash";


  li.appendChild(span);
  li.appendChild(i);
  todoList.appendChild(li);

  addTodo.value = "";
}


function addTodoToStorage(todo) {
  storageChecker();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


let todos = [];

function storageChecker() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
}


function removeTodoToUI(e) {
  if (e.target.className === "fas fa-trash") {
    const todo = e.target.parentElement;
    todo.remove();
    removeTodoToStorage(todo.textContent)
    showAlert("warning", "deleted")
  }
  else {

  }
}


function removeTodoToStorage(e) {
  storageChecker();
  todos.forEach(function (todo, index) {
    if (e === todo) {
      todos.splice(index, 1)
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));

}





function clearTodo() {
  const list = document.querySelectorAll(".todo-Element");
  if (list.length > 0) {
    list.forEach((todo) => {
      todo.remove();
    })

    localStorage.removeItem("todos")

    showAlert("warning", "Cleared")

    // while(todoList.firstChild) {
    //   todoList.removeChild(todoList.firstChild);
    // }
  }
}

function pageLoaded() {
  storageChecker();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  })

  showAlert("load", "Loaded")
}


function filter() {
  const include = todoSearch.value.trim().toLowerCase();
  const list = document.querySelectorAll(".todo-Element");

  if (list.length > 0) {
    list.forEach((todo) => {
      if (todo.textContent.toLowerCase().trim().includes(include)) {
        todo.setAttribute("style", "display:flex")
      }
      else {
        todo.setAttribute("style", "display: none !important")
      }
    })
  }
}





function showAlert(sınıf, text) {
  const div = document.createElement("div")
  div.className = "warn"

  const p = document.createElement("p")
  p.className = sınıf
  p.textContent = text

  div.appendChild(p)
  firstDiv.appendChild(div)

  setTimeout(function () {
    div.remove();
  }, 2000);

}



