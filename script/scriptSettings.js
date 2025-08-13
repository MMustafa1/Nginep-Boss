document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("No userId found in local storage. Redirecting to login.");
        alert("You must be logged in to view settings.");
        window.location.href = './SignIn.html';
        return;
    }

    const nameInput = document.getElementById("nameInput");
    const surnameInput = document.getElementById("SurnameInput");
    const phoneInput = document.getElementById("phoneNumberInput");
    const emailInput = document.getElementById("emailAddressInput");
    const passwordInput = document.getElementById("passwordInput");

    const EditName = document.getElementById("EditButtonName");
    const EditSurName = document.getElementById("EditButtonSurName");
    const EditPhone = document.getElementById("EditButtonPhone");
    const EditEmail = document.getElementById("EditButtonEmail");
    const EditPassword = document.getElementById("EditButtonPassword");

    function fetchUserDataAndPopulateForm(id) {
        fetch(`http://localhost:3000/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            if (user) {
                nameInput.value = user.Name;
                surnameInput.value = user.Surname;
                phoneInput.value = user.PhoneNumber;
                emailInput.value = user.EmailAddress;
                passwordInput.value = user.Password;
                console.log("User data loaded and form populated successfully.");
                disableAllFields();
            } else {
                console.error("User data not found on server.");
                alert("User data could not be found.");
            }
        })
        .catch(error => {
            console.error("Failed to fetch user data:", error);
            alert("Failed to load user data. Please ensure the JSON server is running.");
        });
    }

    function disableAllFields() {
        nameInput.disabled = true;
        surnameInput.disabled = true;
        phoneInput.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;
    }

    EditName.addEventListener("click", () => {
        nameInput.disabled = false;
    });

    EditSurName.addEventListener("click", () => {
        surnameInput.disabled = false;
    });

    EditPhone.addEventListener("click", () => {
        phoneInput.disabled = false;
    });

    EditEmail.addEventListener("click", () => {
        emailInput.disabled = false;
    });

    EditPassword.addEventListener("click", () => {
        passwordInput.disabled = false;
    });

    window.save = function() {
        event.preventDefault(); 
        
        const updatedUser = {
            Name: nameInput.value,
            Surname: surnameInput.value,
            PhoneNumber: phoneInput.value,
            EmailAddress: emailInput.value,
            Password: passwordInput.value
        };

        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User updated successfully:', data);
            alert('User data updated successfully!');
            disableAllFields();
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Failed to update user data. Please try again.');
        });
    }

    window.cancel = function(e) {
        e.preventDefault();
        fetchUserDataAndPopulateForm(userId);
    }

    fetchUserDataAndPopulateForm(userId);
});
