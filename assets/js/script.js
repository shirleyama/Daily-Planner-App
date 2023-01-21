var eventHour = document.querySelector(".hour");
var eventInput = document.querySelector("textarea");
var timeBlocks = document.querySelector(".container");
var toDay = document.querySelector("#currentDay");
var saveButton = document.querySelector(".saveBtn");
toDay.innerHTML = moment().format("dddd MMMM, Do");

// Save button function
function saveTodos(todoText) {
  console.log("Save button clicked");
  console.log("Todo text: " + todoText);
  // Save todo text to local storage
  var todos = getTodos();
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(localStorage.getItem("todos"));
  eventInput.value = "";
  displayTodos();
}

function getTodos() {
  console.log("get todos");
  //checks local storage for todos and if none returns an empty array
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function displayTodos() {
  var todos = getTodos();
  timeBlocks.innerHTML = "";

  if (!todos.length) {
    timeBlocks.innerHTML = "<p>No todos have been added.</p>";
  }

  var currentTime = moment().format("h a");
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
    var todo = todos[i] || "";
    timeBlocks.insertAdjacentHTML(
      "beforeend",
      `
      <div class="row time-block">
        <div class="col-1 hour">${slotTime}</div>
        <div class="col-10 text-area ${status}">
          <textarea class="description" data-index=${i}>${todo} </textarea>
        </div>
        <div class="col-1 button-det">
          <button data-index="${i}" class="btn saveBtn"><i class="fas fa-save"></i></button>
        </div>
      </div>
    `
    );
    currentHour++;
  }
  var textAreas = document.querySelectorAll(".description");
  textAreas.forEach(function (textArea, index) {
    textArea.addEventListener("blur", function (event) {
      var todos = getTodos();
      todos[index] = event.target.value;
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
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
    //saveTodos();
    eventInput.value = "";
    displayTodos();
  }
}

function init() {
  displayTodos();
}

init();
