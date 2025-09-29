const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Load saved tasks
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleComplete(index));

    const del = document.createElement("button");
    del.textContent = "✖";
    del.className = "delete-btn";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (text === "") return alert("Please enter a task!");
  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTodos();
