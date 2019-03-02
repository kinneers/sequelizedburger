/* eslint-disable no-undef */
// All instances of '$' checked and deemed acceptable
$(document).ready(function() {
    
    //Listener for dynamically created "Devour It" buttons
    $(document).on("click tap", "button.eatBurger", eatBurger);
    //Listener for dynamically created "X" buttons
    $(document).on("click tap", "button.byeBurger", deleteBurger);
    
    //Event listener for submitting new burger
    $("#text-enter-button").on('click tap', function(event) {
        event.preventDefault();
        newBurger();
    });

    //When the page loads, display current state of the db
    updateBoth();

    //Displays the created (not yet devoured burgers on the page)
    function getBurgers() {
        $.get("/burgers", function(data) {
            $('#uneaten-burger-container').text('');
            if (data.length === 0) {
                // eslint-disable-next-line no-console
                console.log('No burgers in queue.');
            } else {
                for (var i = 0; i < data.length; i++) {
                    var row = 
                        `<div class="col-md-12 text-center" class="task">
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
    }

    //Displays devoured burgers on page
    function getEaten() {
        $.get("/burgers/devoured", function(data) {
            $('#eaten-burger-container').text('');
            if (data.length === 0) {
                // eslint-disable-next-line no-console
                console.log('No burgers have been devoured yet');
            } else {
                for (var i = 0; i < data.length; i++) {
                    var eaten = 
                        `<div class="col-md-12 text-center" class="task">
                            <div class="row">
                                <div class="col-md-8 text-center burgerAndButton">
                                    <p><strike>${data[i].id}. ${data[i].name}</strike></p>
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

    //Adds a new (uneaten) burger to the database and calls getBurgers to display this column
    function newBurger() {
        //Reference to input field where user adds new burger
        var $newItemInput = $(".newBurger").val().trim();
        var burger = {
            name: $newItemInput,
            devoured: false
        }
        $.post('/burgers/create', burger).then(getBurgers);
        //Clears input box
        $('.newBurger').val('');
    }

    //"Devours" a burger and moves it to the right side of the screen
    function eatBurger(event) {
        event.preventDefault();
        //Updates burger status to devoured: true
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
    }

    //Function call when both sides of the page need to be updated
    function updateBoth() {
        getBurgers();
        getEaten();
    }

    //Deletes a burger from the database entirely and removes it from the right side of the screen
    function deleteBurger(event) {
        event.preventDefault();
        var deleteBurgerID = event.target.value;
        $.ajax({
            method: "DELETE",
            url: "/burgers/delete/" + deleteBurgerID
        }).then(getEaten);
    }
});
