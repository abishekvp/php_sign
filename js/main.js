function signup(){
    var name = document.getElementById("su-name").value;
    var contact = document.getElementById("su-contact").value;
    var email = document.getElementById("su-email").value;
    var password = document.getElementById("su-password").value;
    var re_password = document.getElementById("su-re_password").value;

    if(name!="" && contact!="" && email!="" && password===re_password){
        $.ajax({
            type: 'POST',  
            url: './php/main.php', 
            data: { fuc:"signup", name:name, contact:contact, email:email, password:password },
            success: function(response) {
                if(response=="registered"){
                    window.localStorage.setItem("signin", true);
                    window.localStorage.setItem("email", email);
                    window.location.href="./profile.html";
                }
                else if(response=="exists") {
                    alert("User with this email already Registered");
                }
            }
        });
    }else{
        alert("Provide required details");
    }
}

function signin(){
    var email = document.getElementById("si-email").value;
    var password = document.getElementById("si-password").value;
    
    if(email!="" && password!=""){
        $.ajax({
            type: 'POST',  
            url: './php/main.php',
            data: { fuc:"signin", email:email, password:password },
            success: function(response) {
                if(response=="found"){
                    window.localStorage.setItem("signin", true);
                    window.localStorage.setItem("email", email);
                    window.location.href="./profile.html";
                }
                else if(response=="notfound") {
                    alert("user not found");
                    window.localStorage.setItem("signin", false);
                }
            }
        });
    }else{
        alert("Provide required details");
    }
}


function signout(){
    window.localStorage.clear();
    window.location.href="./index.html";
}


function fetch_profile(){
    if(window.localStorage.getItem("signin")){
        $.ajax({
            type: 'POST',  
            url: './php/main.php',
            data: { fuc:"profile", email:window.localStorage.getItem("email") },
            success: function(response) {
                data=response.split("&");
                document.getElementById("name").value=data[0];
                document.getElementById("contact").value=data[1];
                document.getElementById("email").value=data[2];
                document.getElementById("password").value=data[3];
            }
        });
    }else{
        window.location.href = "./index.html";
    }
}

function update(){
    var name = document.getElementById("name").value;
    var contact = document.getElementById("contact").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if(name!="" && contact!="" && email!="" && password!=""){
        $.ajax({
            type: 'POST',  
            url: './php/main.php', 
            data: { fuc:"update", name:name, contact:contact, email:window.localStorage.getItem("email"), email_c:email, password:password },
            success: function(response) {
                alert(response);
                if(response==="updated"){
                    window.localStorage.setItem("signin", true);
                    window.localStorage.setItem("email", email);
                    window.location.href="./profile.html";
                }
                else{
                    alert(response);
                }
            }
        });
    }else{
        alert("Provide required details")
    }
}

