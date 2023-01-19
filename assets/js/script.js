var eventHour = document.querySelector(".hour");
var eventInput = document.querySelector("textarea");
var timeBlocks = document.querySelector(".container");
var toDay = document.querySelector("#currentDay");
var saveButton = document.querySelector(".saveBtn");
toDay.innerHTML = moment().format("dddd MMMM, Do");

// Save button function
function saveTodos(event) {
  event.preventDefault();
  console.log("Save button clicked");
  var todoText = document.querySelector("textarea").value;
  console.log("Todo text: " + todoText);

  // Save todo text to local storage
  localStorage.setItem("todos", JSON.stringify(todoText));
  eventInput.value = "";
  displayTodos();
}

function getTodos() {
  console.log("get todos");
  //checks local storage for todos and if none returns an empty array
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function displayTodos() {
  console.log("display todos");
  var todos = getTodos();
  // //clear todos
  timeBlocks.innerHTML = "";

  if (!todos.length) {
    timeBlocks.innerHTML = "<p>No todos have been added.</p>";
  }
  var currentTime = moment().format("HH");
  var currentHour = 9;
  for (var i = 0; i < 8; i++) {
    var slotTime = moment().hour(currentHour).format("h a");
    if (currentTime === slotTime) {
      var status = "present";
    } else if (currentTime < slotTime) {
      var status = "future";
    } else if (currentTime > slotTime) {
      var status = "past";
    }
    console.log(slotTime);
    var todo = todos[i] || "";
    timeBlocks.insertAdjacentHTML(
      "beforeend",
      `
      <div class="row time-block">
      <div class="col-1 hour">${slotTime}</div>
      <div class="col-10 text-area ${status}">
        <textarea class="description">${todo} </textarea>
      </div>
      <div class="col-1 button-det">
        <button data-index="${i}" class="btn saveBtn"><i class="fas fa-save"></i></button>
      </div>
    </div>
    `
    );
    currentHour++;
  }
}

function addTodo(event) {
  var keyPressed = event.keyCode;

  if (keyPressed === 13) {
    console.log("add todo");

    var todos = getTodos();
    var todoText = eventInput.value;
    console.log(todoText);

    if (!todoText) return;
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    eventInput.value = "";
    displayTodos();
  }
}

function init() {
  eventInput.addEventListener("keydown", addTodo);
  saveButton.addEventListener("click", saveTodos); //grabbing click event

  displayTodos();
}

init();
