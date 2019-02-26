$(document).ready(function() {

  $(document).on("click", "button.eatBurger", eatBurger);

  //Event listener for submitting new burger
  $("#text-enter-button").on('click tap', function(event) {
    event.preventDefault();
    newBurger();
  });

  $(".devourButton").on('click tap', $('#uneaten-burger-container'), function(event) {
    event.preventDefault();
    console.log("Button Clicked");
    var thisBurger = $(this).val();
    console.log(thisBurger);
    eatBurger();
  });

  //When the page loads, display uneaten burgers
  getBurgers();

  function getBurgers() {
    $.get("/burgers", function(data) {
      if (data.length === 0) {
        console.log('No burgers in queue.');
      } else {
        $("#uneaten-burger-container").text('');
        for (var i = 0; i < data.length; i++) {
          var row = `<div class="col-md-12 text-center" class="task">
                      <div class="row">
                        <div class="col-md-8 text-center burgerAndButton">
                          <p>${data[i].id}. ${data[i].name}</p>
                        </div>
                        <div class="col-md-4 text-center burgerAndButton">
                          <button type="submit" class="eatBurger btn btn-success" value=${data[i].id}>Devour it!</button>
                        </div>
                      </div>
                    </div><br>`
          $("#uneaten-burger-container").append(row);
        }
      }
    });
  };

  function newBurger() {
    console.log("Working");
      //Reference to input field where user adds new burger
    var $newItemInput = $(".newBurger").val().trim();
    console.log($newItemInput);
    var burger = {
      name: $newItemInput,
      devoured: false
    }
    $.post('/burgers/create', burger);
    $('.newBurger').val('');
    getBurgers();
  }

  function eatBurger() {
    event.preventDefault();
    //Update burger status to devoured: true
    console.log("Eating burger...");
  }

});

// $(document).ready(function() {
//   // Adding event listeners for deleting, editing, and adding todos
//   $(document).on("click", "button.delete", deleteTodo);
//   $(document).on("click", "button.complete", toggleComplete);
//   $(document).on("click", ".todo-item", editTodo);
//   $(document).on("keyup", ".todo-item", finishEdit);
//   $(document).on("blur", ".todo-item", cancelEdit);
//   $(document).on("submit", "#todo-form", insertTodo);

//   // Our initial todos array
//   var todos = [];

//   // Getting todos from database when page loads
//   getTodos();

//   // This function resets the todos displayed with new todos from the database
//   function initializeRows() {
//     $todoContainer.empty();
//     var rowsToAdd = [];
//     for (var i = 0; i < todos.length; i++) {
//       rowsToAdd.push(createNewRow(todos[i]));
//     }
//     $todoContainer.prepend(rowsToAdd);
//   }

//   // This function grabs todos from the database and updates the view
//   function getTodos() {
//     $.get("/api/todos", function(data) {
//       todos = data;
//       initializeRows();
//     });
//   }

//   // This function deletes a todo when the user clicks the delete button
//   function deleteTodo(event) {
//     event.stopPropagation();
//     var id = $(this).data("id");
//     $.ajax({
//       method: "DELETE",
//       url: "/api/todos/" + id
//     }).then(getTodos);
//   }

//   // This function handles showing the input box for a user to edit a todo
//   function editTodo() {
//     var currentTodo = $(this).data("todo");
//     $(this).children().hide();
//     $(this).children("input.edit").val(currentTodo.text);
//     $(this).children("input.edit").show();
//     $(this).children("input.edit").focus();
//   }

//   // Toggles complete status
//   function toggleComplete(event) {
//     event.stopPropagation();
//     var todo = $(this).parent().data("todo");
//     todo.complete = !todo.complete;
//     updateTodo(todo);
//   }

//   // This function starts updating a todo in the database if a user hits the "Enter Key"
//   // While in edit mode
//   function finishEdit(event) {
//     var updatedTodo = $(this).data("todo");
//     if (event.which === 13) {
//       updatedTodo.text = $(this).children("input").val().trim();
//       $(this).blur();
//       updateTodo(updatedTodo);
//     }
//   }

//   // This function updates a todo in our database
//   function updateTodo(todo) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/todos",
//       data: todo
//     }).then(getTodos);
//   }

//   // This function is called whenever a todo item is in edit mode and loses focus
//   // This cancels any edits being made
//   function cancelEdit() {
//     var currentTodo = $(this).data("todo");
//     if (currentTodo) {
//       $(this).children().hide();
//       $(this).children("input.edit").val(currentTodo.text);
//       $(this).children("span").show();
//       $(this).children("button").show();
//     }
//   }

//   // This function constructs a todo-item row
//   function createNewRow(todo) {
//     var $newInputRow = $(
//       [
//         "<li class='list-group-item todo-item'>",
//         "<span>",
//         todo.text,
//         "</span>",
//         "<input type='text' class='edit' style='display: none;'>",
//         "<button class='delete btn btn-danger'>x</button>",
//         "<button class='complete btn btn-primary'>✓</button>",
//         "</li>"
//       ].join("")
//     );

//     $newInputRow.find("button.delete").data("id", todo.id);
//     $newInputRow.find("input.edit").css("display", "none");
//     $newInputRow.data("todo", todo);
//     if (todo.complete) {
//       $newInputRow.find("span").css("text-decoration", "line-through");
//     }
//     return $newInputRow;
//   }

//   // This function inserts a new todo into our database and then updates the view
//   function insertTodo(event) {
//     event.preventDefault();
//     var todo = {
//       text: $newItemInput.val().trim(),
//       complete: false
//     };

//     $.post("/api/todos", todo, getTodos);
//     $newItemInput.val("");
//   }
// });
