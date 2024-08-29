$(document).ready(function (){

    console.log("ready!");

    var myInput = document.getElementById("pwd");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
        document.getElementById("message").style.display = "block";
    }

    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
        document.getElementById("message").style.display = "none";
    }

    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } 
        else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } 
        else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } 
        else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if(myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } 
        else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    // Toggle response visible if yes button is clicked
    $("#yes").click(function (){
        $(".yesResponse").toggle();
    })

    $("#pet6").click(function (){
        $("#otherPet6").toggle();
    })

    $("#submitButton").on("click", function (event) {
        
        event.preventDefault();

        console.log("submit is clicked");

        // get value of inputs
        let firstName = $("#fname").val();
        console.log(firstName);
        let lastName = $("#lname").val();
        console.log(lastName);
        let email = $("#email").val();
        console.log(email);
        let username = $("#username").val();
        console.log(username);
        let password = $("#password").val();
        console.log(password);
        let color = $("#favcolor").val();
        console.log(color);
        let birthday = $("#birthday").val();
        console.log(birthday);

        $("#myModal").modal("show");
    });

    $("#loadProfile").on("click", function () {
        console.log("button clicked: "); //TODO: find out who clicked me, w/this?

        $.ajax({
            url: "profile.json",
            dataType: "json",
            success: function (data) {
                console.log(data.fname);
                $("#fname").val(data.fname);
                console.log(data.optIn);
                console.log(data.lname);
                $("#lname").val(data.lname);
                console.log(data.optIn);
                console.log(data.email);
                $("#email").val(data.email);
                console.log(data.optIn);
                console.log(data.username);
                $("#username").val(data.username);
                console.log(data.optIn);
                console.log(data.pwd);
                $("#pwd").val(data.pwd);
                console.log(data.optIn);
                    
                $("#optIn").prop("checked", data.optIn);
            },
        });
    });
});