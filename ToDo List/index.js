var arr = [];
var completedArr = [];
var state = 0;


var add = document.getElementById("addList");       // Selects the 'ul' element to populate lists
var input = document.getElementById("user-input");  // selects input element where the user enters text

var all = document.querySelector(".all")            // Selects All Button
var active = document.querySelector(".active")      // Selects Active button
var complete = document.querySelector(".completed") // Selects Completed button
var left = document.querySelector(".left");         // Para tag to display left items
var toggleSelect = document.querySelector(".selectAll");
var foot = document.querySelector(".foot");


// Adding a user input value
function addTodo(e) {
  if(e.keyCode == 13) {
    if( /^ *$/.test(input.value)) return;
    
    var randomId = Date.now();
                                          
    arr.push( { todo: input.value, checked: false, id: randomId } );

    input.value = "";
    stateDisplay();
  }
}

// Displaying the list
function displayTodo(thisArr) {
  
  add.innerHTML = "";
  thisArr.forEach(elem => {
    add.innerHTML += 
    `<li class="list-node"><input data-id="${elem.id}" type="checkbox" ${elem.checked ? "checked" : ""}><label class= "${elem.checked ? "label" : ""}" data-id="${elem.id}">${elem.todo}</label><span data-id="${elem.id}" class="delete fas fa-times fa-2x"></span></li>`;
  });

  lefting();
  }
  
  
// Event listener function to select the respective id and toggle the checked property
function handleList(e) {

  if(e.target.localName !== 'input') return;
  const	id = e.target.dataset.id;

  completedArr.push(arr.filter(elem => (id == elem.id)));
  // console.log(completedArr);

  toggleTodo(id);
  stateDisplay();
}	

function stateDisplay() {
  if(state == 0) {
    displayTodo(arr);
  } else if (state == 1) {
    remaining();
  } else if (state == 2) {
    completed();
  }
}
 

// Checking the checked property of the ToDo.
function toggleTodo(id) {
  arr.forEach(elem => {
    if (id == elem.id) {
      elem.checked = !elem.checked;
    }
  });
}


// Deletes a Todo list
function deleteTodo(e) {
  if(e.target.nodeName !== "SPAN") return;
  
  const	id = e.target.dataset.id;

  removeTodoArr(id);
}


// Removes or Deletes a task list ftom the source truth array
function removeTodoArr (del_id) {
  arr = arr.filter( (item) => item.id != del_id );

  completedArr = completedArr.filter( (elem) => elem.id != del_id);
  displayTodo(arr);
}

// Displays completed or checked lists
function completed() {
  var completedTask = arr.filter( elem => elem.checked == true);
  
  all.classList.remove("selected");
  active.classList.remove("selected");
  complete.classList.add("selected");

  displayTodo(completedTask);
}


// Displays remaining or pending tasks lists
function remaining() {
  var remainingTask = arr.filter( elem => elem.checked == false);

  all.classList.remove("selected");
  complete.classList.remove("selected");
  active.classList.add("selected");

  displayTodo(remainingTask);
}

// Displays all Todo lists

function allTasks() {

  active.classList.remove("selected");
  complete.classList.remove("selected");
  all.classList.add("selected");

  displayTodo(arr);
}


// Displays number of items remaining on the bottom left of the todo-container
function lefting() {
  let countChecked = arr.filter( v => v.checked == false);
  left.textContent = `${countChecked.length} Items left`;
}

// Displays clear completed lists on the bottom right of the todo-container
function clearCompleted() {
  let del_id;
  arr.forEach( v => {

    if (v.checked == true) {
      del_id = v.id;
    }
    
    removeTodoArr(del_id);
    allTasks();

  });
}



// toggleSelect.classList.toggle("selectedAll");

function selectAllList(e) {
  
  
  let newArr = arr.filter( v =>  v.checked == true);
  
  if(arr.length == newArr.length) {
    arr.forEach( v => v.checked = false);
  } else {
    arr.forEach( v => v.checked = true);
  }

  stateDisplay();



//   toggleSelect.addEventListener("click", ()=>{

//   displayTodo(arr);  
// });

}

toggleSelect.addEventListener("click", selectAllList);


// Event Listeners
input.addEventListener("keydown", addTodo);   // When "Enter" key is pressed, it adds the list to the array.
input.addEventListener("keydown", addTodo);   // When "Enter" key is pressed, it adds the list to the array.
add.addEventListener("click", handleList);    // Marks the list.
add.addEventListener("click", deleteTodo);    // Deletes the list on clicking the close icon.
toggleSelect.addEventListener("click", selectAllList);


active.addEventListener("click", () => {
  state = 1; stateDisplay();
})
complete.addEventListener("click", () => {
  state = 2; stateDisplay();
})