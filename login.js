// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {
    //$("[name='user']").val('');
    //$("[name='user']").focus();
    $.get("/perl/jadrn010/AfterLogin.cgi", login);



    $("#logout").on('click', function(e) {
        $.get("/perl/jadrn010/logout.cgi", logout);
    });

    $("#loginReset").on('click', function(e) {
        document.getElementById("loginStatus").innerHTML = "";
    });

    $("#login").on('click', function(e) {
        var username = document.getElementById('user').value;
        var password = document.getElementById('pass').value;
        if (!username && !password) {
            document.getElementById("loginStatus").innerHTML = "Enter Username and Password!";
            $("#user").focus();
        } else if (!username) {
            document.getElementById("loginStatus").innerHTML = "Enter Username!";
            $("#user").focus();
        } else if (!password) {
            document.getElementById("loginStatus").innerHTML = "Enter Password!";
            $("#pass").focus();
        } else {
            var url = "/perl/jadrn010/login.cgi";
            url += "?username=" + username + "&password=" + password;
            $.get(url, AfterLogin);
        }
    });


});


function AfterLogin(response) {
    if (response.startsWith("Success") || response.startsWith("Content-type: text/html")) {
        $("#homePage").show();
        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/image1.jpg')");
        $("#loginPage").hide();
        location.reload(true);
    } else if (response.startsWith("Error")) {
        document.getElementById("loginStatus").innerHTML = "Invalid Credentials! Please enter correct Username and Password!";
        $("#user").focus();
        $("#loginPage").show();
        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/login_bg.jpg')");
        $("#homePage").hide();
    }
}

function login(response) {
    if (response.startsWith("Success") || response.startsWith("Content-type: text/html")) {
        $("#homePage").show();
        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/image1.jpg')");
        $("#loginPage").hide();
    } else if (response.startsWith("Error")) {
        $("#loginPage").show();
        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/login_bg.jpg')");
        $("#homePage").hide();
    }
}

function logout(response) {
    if (response.startsWith("Success") || response.startsWith("Content-type: text/html")) {
        $("#homePage").hide();
        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/login_bg.jpg')");
        $("#loginPage").show();
        document.getElementById("loginStatus").innerHTML = "You are now Logged out!";
        $("#user").val() = "";
        $("#user").val() = "";
        document.getElementById("loginStatus").innerHTML = "";
    } else if (response.startsWith("Error")) {
        $("#loginPage").hide();

        $("body").css("background-image", "url('http://jadran.sdsu.edu/~jadrn010/proj1/images/image1.jpg')");
        $("#homePage").show();
    }
}