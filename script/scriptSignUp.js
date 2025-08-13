let form=document.querySelector("form");

let Name = document.getElementById("Name");
let Surname = document.getElementById("Surname");
let PhoneNumber = document.getElementById("PhoneNumber");
let EmailAddress = document.getElementById("EmailAddress");
let password = document.getElementById("password");
let checkBox=document.getElementById("checkbox");

const nameMethod=/^[A-Za-z\s]+$/;
const emailMethod= /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const phoneNumberMethod=/^[0-9]+$/;

let nameError=document.getElementById("nameError");
let surNameError=document.getElementById("surNameError");
let phoneNumberError=document.getElementById("phoneNumberError");
let emailError=document.getElementById("emailError");
let passwordError=document.getElementById("passwordError");

let valid=true;

form.addEventListener("submit", function(e){
    e.preventDefault();

    valid=true;    
    if(!nameMethod.test(Name.value))
    {   
        nameError.innerHTML="Invalid Name";
        valid=false;
    }
    else
    {
        nameError.innerHTML="";
    }

    if(!nameMethod.test(Surname.value))
    {
        surNameError.innerHTML="Invalid Name";
        valid=false;
    }
    else
    {
        surNameError.innerHTML="";
    }

    if(!phoneNumberMethod.test(PhoneNumber.value))
    {
        phoneNumberError.innerHTML="Invalid number";
        valid=false;
    }
    else if (PhoneNumber.value.length<=6)
    {
        phoneNumberError.innerHTML="Incorrect number";
        valid=false;
    }
    else
    {
        phoneNumberError.innerHTML="";
    }

    if(!emailMethod.test(EmailAddress.value))
    {
        emailError.innerHTML="Invalid format";
        valid=false;
    }
    else 
    {
        emailError.innerHTML="";
    }

    if(password.value.length<8)
    {
        passwordError.innerHTML="A password should contail at least 8 digits";
        valid=false;
    }
    else 
    {
        passwordError.innerHTML="";
    }

    if(valid)
    {
        SignUp();
    }

});


Name.addEventListener("blur", function() {
    if (Name.value.length===0)
    {
        nameError.innerHTML="Required";
        valid=false;
    }
    else if(!nameMethod.test(Name.value) || Name.value.length<3) {
        nameError.innerHTML = "Invalid Name";
        valid=false;
    } 
    else 
    {
        nameError.innerHTML = "";
    }
});

Surname.addEventListener("blur", function() {
    if (Surname.value.length===0)
    {
        surNameError.innerHTML="Required";
        valid=false;
    }
    else if(!nameMethod.test(Surname.value) || Surname.value.length<3)
    {
        surNameError.innerHTML="Invalid Name";
        valid=false;
    }
    else
    {
        surNameError.innerHTML="";
    }
});

PhoneNumber.addEventListener("blur", function() {
    if (PhoneNumber.value.length===0)
    {
        phoneNumberError.innerHTML="Required";
        valid=false;
    }
    else if(!phoneNumberMethod.test(PhoneNumber.value))
    {
        phoneNumberError.innerHTML="Invalid number";
        valid=false;
    }
    else if (PhoneNumber.value.length<=6)
    {
        phoneNumberError.innerHTML="Incorrect number";
        valid=false;
    }
    else
    {
        phoneNumberError.innerHTML="";
    }
});

EmailAddress.addEventListener("blur", function() {
    if (EmailAddress.value.length===0)
    {
        emailError.innerHTML="Required";
        valid=false;
    }
    else if(!emailMethod.test(EmailAddress.value))
    {
        emailError.innerHTML="Invalid format";
        valid=false;
    }
    else 
    {
        emailError.innerHTML="";
    }

    fetch(`http://localhost:3000/users?email=${encodeURIComponent(EmailAddress.value)}`)
    .then (response => response.json())
    .then (data => {
        if(data.length>0)
        {
            emailError.innerHTML="Email already registered";
            valid=false;
        }
        else
        {
            emailError.innerHTML="";
            valid=true;
        }
    })
    .catch(err => {
        console.log("error checking email",err);
        emailError.innerHTML="Server error, Please try again later";
        valid=false;
    });
});

password.addEventListener("blur", function() {
    if (password.value.length===0)
    {
        passwordError.innerHTML="Required";
        valid=false;
    }
    else if(password.value.length<8)
    {
        passwordError.innerHTML="A password should contail at least 8 digits";
        valid=false;
    }
    else 
    {
        passwordError.innerHTML="";
    }
});

let signUpButton=document.getElementById("LowerDivButton2");
checkBox.addEventListener("change", function() {
    if(!checkBox.checked)
    {
        signUpButton.disabled=true;
        signUpButton.style.cursor="not-allowed";
        signUpButton.style.opacity="0.2";
    }
    else
    {
        signUpButton.disabled=false;
        signUpButton.style.cursor="pointer";
        signUpButton.style.opacity="1";
    }
});


function SignUp()
{
    if(Name.value.trim()!=="" && Surname.value.trim()!=="" && password.value.trim()!=="" && PhoneNumber.value.trim()!=="" && EmailAddress.value.trim()!=="")
    {
        const newUser = {
            Name:Name.value.trim(),
            Surname:Surname.value.trim(),
            PhoneNumber:PhoneNumber.value.trim(),
            EmailAddress:EmailAddress.value.trim(),
            Password:password.value.trim()
        }
        fetch ("http://localhost:3000/users",{
            method:"POST",
            headers: { "Content-Type" : "application/json"},
            body : JSON.stringify(newUser)
        })
        .then (res => {
            if(!res.ok)
            {
                throw new Error("failed to save user");
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem("userId", data.id);
            console.log("User saved", data);
            alert("Successfully Signed Up.");
            window.location.href="./DashBoard.html";
            form.reset();
        })
        .catch(err => {
            console.log("User failed to save",err);
            alert("Sign Up unsuccessful, try again later");
        });
    }
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