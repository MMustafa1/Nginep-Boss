let form=document.querySelector("form");

let EmailAddress = document.getElementById("EmailAddress");
let password = document.getElementById("password");

let emailError=document.getElementById("emailError");
let passwordError=document.getElementById("passwordError");

const emailMethod= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

form.addEventListener("submit",function(e){
    e.preventDefault();
    Login(EmailAddress.value.trim(),password.value.trim());
});

function Login(email,password) {
    if(!emailMethod.test(email))
    {
        emailError.innerHTML="Invalid Email format";
        return;
    }

    fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then (data=> {
        if(data.length ===0) {
            emailError.innerHTML="Email not found";
            return;
        }
        const user= data[0];
        if(user.Password===password)
        {
            console.log("Successfully login");
            alert("Successfully login");
            window.location.href="";
        }
        else
        {
            passwordError.innerHTML="Password not correct";
            return;
        }
    })
    .catch (err => {
        console.log("failed to login", err);
        alert("Server error , please try again later");
    });
} 

let passwordViwer=document.getElementById("passwordViwer");
let passwordIsHidden=false;

function showPassword()
{
    if(passwordIsHidden)
    {
        password.type="password";
        passwordViwer.src="../asserts/Icons/ic-no-eye.png";
    }
    else
    {
        password.type="text";
        passwordViwer.src="../asserts/Icons/view-password.jpg";
    }
    passwordIsHidden= !passwordIsHidden;
}