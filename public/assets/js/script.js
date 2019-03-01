$(document).ready(function() {
  //Listener for dynamically created "Devour It" buttons
  $(document).on("click tap enter", "button.eatBurger", eatBurger);
  //Listener for dynamically created "X" buttons
  $(document).on("click tap enter", "button.byeBurger", deleteBurger);

  //Event listener for submitting new burger
  $("#text-enter-button").on('click tap enter', function(event) {
    event.preventDefault();
    newBurger();
  });

  //When the page loads, display uneaten burgers
  getBurgers();
  getEaten();

  function getBurgers() {
    $.get("/burgers", function(data) {
      $('#uneaten-burger-container').text('');
      if (data.length === 0) {
        console.log('No burgers in queue.');
      } else {
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

  function getEaten() {
    $.get("/burgers/devoured", function(data) {
      $('#eaten-burger-container').text('');
      if (data.length === 0) {
        console.log('No burgers have been devoured yet');
      } else {
        for (var i = 0; i < data.length; i++) {
          var eaten = `<div class="col-md-12 text-center" class="task">
                      <div class="row">
                        <div class="col-md-8 text-center burgerAndButton">
                          <p>${data[i].id}. ${data[i].name}</p>
                        </div>
                        <div class="col-md-4 text-center burgerAndButton">
                        <button type="submit" class="byeBurger btn btn-danger" value=${data[i].id}>X</button>
                      </div>
                      </div>
                    </div><br>`
          $("#eaten-burger-container").append(eaten);
        }
      }
    });
  }

  function newBurger() {
    console.log("Working");
      //Reference to input field where user adds new burger
    var $newItemInput = $(".newBurger").val().trim();
    console.log($newItemInput);
    var burger = {
      name: $newItemInput,
      devoured: false
    }
    $.post('/burgers/create', burger).then(getBurgers);
    $('.newBurger').val('');
  }

  function eatBurger(event) {
    event.preventDefault();
    //Update burger status to devoured: true
    console.log("Eating burger...");
    var burgerID = event.target.value;
    var updateBurger = {
      id: burgerID,
      devoured: true
    }
    $.ajax({
      method: "PUT",
      url: "/burgers/update",
      data: updateBurger
    }).then(updateBoth);
  };

  function updateBoth() {
    getBurgers();
    getEaten();
  };

  function deleteBurger(event) {
    event.preventDefault();
    var deleteBurgerID = event.target.value;
    $.ajax({
      method: "DELETE",
      url: "/burgers/delete/" + deleteBurgerID
    }).then(getEaten);
  };
});
