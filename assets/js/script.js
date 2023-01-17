/*
  While/For Loop that loops starting at 9 and breaks at 5
    - For each loop generate or build html timeblock row
      • Append timeblock to container
        º Hour
          - A number corresponding with the hour in 12 hour format
        º Textarea
          - Show existing event text, if any and allow user to input event text
        º Save Button
          - When clicked, store/reset the event text corresponding with the hour to localStorage
      • Increase hour by one
      • Check if hour is past, current or future and apply corresponding css class to timeblock

*/
var slot = document.querySelector(".hour");
var input = document.querySelector("textarea");
var todoDesc = document.querySelector(".time-block");
// var saveButton = document.querySelector("saveBtn");

// for (var time = 0; time >= 8 || time <= 17; time++) {
//   console.log(time);
//   time--;
// }

function saveTodos(event) {
  var el = event.target;
  if (el.tagName === "BUTTON") {
    console.log("save todos");
    saveTodo(arr);
  }
}
function saveTodo(arr) {
  console.log("save todos");
  localStorage.setItem("todos", JSON.stringify(arr));
}
function getTodos() {
  console.log("get todos");
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function displayTodos() {
  console.log("display todos");
  // var todos = getTodos();

  // //clear todos
  // output.innerHTML = "";

  // if (!todos.length) {
  //   output.innerHTML = "<p>No todos have been added.</p>";
  // }

  // todos.forEach(function (todo, index) {
  //   //loop through todos
  //   output.insertAdjacentHTML(
  //     "afterbegin",
  //     `
  //   <li>
  //       <span>${todo}</span>
  //       <button data-index="${index}">Complete</button>
  //   </li>
  //   `
  //   );
  // });
}

function addTodo(event) {
  var keyPressed = event.keyCode;

  if (keyPressed === 13) {
    console.log("add todo");

    var todos = getTodos(); //yet if no todos will return undefined// we are going to be pushing to this, but cant push if it's an array.
    // //this will be the array of todod we've already stored or it'll be an empty array
    // //lets get actual value from input above.
    var todoText = input.value;

    if (!todoText) return; //reurn can return a value from a function or it can stop everything and breakout
    // //our value should have text in case they just hit enter without adding text, key13 pressed will be a truthy
    todos.push(todoText);
    saveTodo(todos);

    // saveTodos(todos);
    // input.value = "";
    // displayTodos();
  }
} //we need to track event to see if the enter key is pressed

// function deleteTodo(event) {
//   var el = event.target;
//   if (el.tagName === "BUTTON") {
//     //checking to see if button clicked and not the ul
//     var todos = getTodos();
//     var todoIndex = el.dataset.index;

//     todos.splice(todoIndex, 1);
//     saveTodos(todos);
//     displayTodos();
//   }
// }

function init() {
  input.addEventListener("keydown", addTodo);
  //if input is inside a form element would cause browser to refresh if it is clicked
  todoDesc.addEventListener("click", saveTodos); //grabbing click event that will pass from the lis to the ul
  displayTodos();
}

init();
