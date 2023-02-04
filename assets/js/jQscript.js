var timeBlocks = $(".container");
var showMsg = $(".message");
var eventHour = $(".hour");
var eventInput = $("textarea");
var toDay = $("#currentDay");

toDay.html(moment().format("dddd MMMM, Do"));

function saveTodos(todoText) {
  var todos = getTodos();
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
  eventInput.val("");
  displayTodos();
}

function getTodos() {
  console.log("get todos if any");
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function displayTodos() {
  var todos = getTodos();
  timeBlocks.html("");
  if (!todos.length) {
    timeBlocks.html("<p>No todos have been added.</p>");
  }
  var currentTime = moment().format("HH");
  var currentHour = 9;
  for (var i = 0; i <= 8; i++) {
    var slotTime = moment().hour(currentHour).format("HH");
    var status;
    if (currentTime === slotTime) {
      status = "present";
    } else if (currentTime < slotTime) {
      status = "future";
    } else if (currentTime > slotTime) {
      status = "past";
    }
    var slotTime = moment().hour(currentHour).format("h a");
    var todo = todos[i] || "";
    timeBlocks.append(
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
  var textAreas = $(".description");
  var saveButtons = $(".saveBtn");
  saveButtons.each(function (index) {
    $(this).on("click", function (event) {
      var todos = getTodos();
      todos[index] = textAreas.eq(index).val();
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todos.length) {
        showMsg.html(
          "<p>Appointment added to <span>local storage</span>	&#9989;</p>"
        );
        setTimeout(function () {
          showMsg.html("");
        }, 5000);
      }
    });
  });
}

function addTodo() {
  var todoText = $("#eventInput").val();
  if (!todoText) return;
  todos.push(todoText);
  $("#eventInput").val("");
  displayTodos();
}

$("#eventInput").keypress(function (event) {
  var keyPressed = event.keyCode;
  if (keyPressed === 13) {
    addTodo();
  }
});

function init() {
  displayTodos();
}

init();
