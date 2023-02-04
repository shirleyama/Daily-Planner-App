var timeBlocks = document.querySelector(".container");
var showMsg = document.querySelector(".message");
var eventHour = document.querySelector(".hour");
var eventInput = document.querySelector("textarea");
var toDay = document.querySelector("#currentDay");

toDay.innerHTML = moment().format("dddd MMMM, Do");

// Save button function
function saveTodos(todoText) {
  // Save todo text to local storage
  var todos = getTodos();
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
  eventInput.value = "";
  displayTodos();
}

//Gets the todos from local storage and if none returns an empty array
function getTodos() {
  console.log("get todos if any");
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function displayTodos() {
  var todos = getTodos();
  timeBlocks.innerHTML = "";
  if (!todos.length) {
    timeBlocks.innerHTML = "<p>No todos have been added.</p>";
  }
  var currentTime = moment().format("HH");
  var currentHour = 9;
  for (var i = 0; i <= 8; i++) {
    var slotTime = moment().hour(currentHour).format("HH");
    if (currentTime === slotTime) {
      var status = "present";
    } else if (currentTime < slotTime) {
      var status = "future";
    } else if (currentTime > slotTime) {
      var status = "past";
    }
    var slotTime = moment().hour(currentHour).format("h a");
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
  var saveButtons = document.querySelectorAll(".saveBtn");

  saveButtons.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
      var todos = getTodos();

      todos[index] = textAreas[index].value;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todos.length) {
        showMsg.innerHTML =
          "<p>Appointment added to <span>local storage</span>	&#9989;</p>";
        setTimeout(function () {
          showMsg.innerHTML = "";
        }, 5000); // the message will disappear after 5000 milliseconds (5 seconds)
      }
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
