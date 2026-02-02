// API Configuration - Automatically detect server URL
// api.js
// const BASE_URL = "http://192.168.0.103:5500";



/// js/api.js

const API_BASE_URL = "https://helpinghands-7x93.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    if (form) {
        form.addEventListener("submit", handleSignup);
    }
});

// SIGNUP
async function signupUser(data) {
    const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

// LOGIN
async function loginUser(data) {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}



// ==================== USER FUNCTIONS ====================

function handleSignup(event) {
    event.preventDefault();

    console.log("Signup handler triggered");

    const data = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    confirmPassword: confirmPassword.value
};

    fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Signup successful");
        window.location.href = "login.html";
    })
    .catch(err => {
        console.error(err);
        alert("Signup failed");
    });
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    clearErrors(['email', 'password']);
    
    if (!email || !password) {
        showError('emailError', 'Email and password are required');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            showSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            showError('passwordError', data.message);
        }
    } catch (error) {
        showError('passwordError', 'Network error: ' + error.message);
    }
}

// ==================== BOOKING FUNCTIONS ====================

async function handleBooking(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const serviceType = document.getElementById('serviceType').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const serviceTime = document.getElementById('serviceTime').value;
    const additionalNotes = document.getElementById('additionalNotes').value.trim();
    const totalPrice = document.getElementById('totalPrice').textContent.replace('₹', '').trim();
    
    clearErrors(['fullName', 'email', 'phone', 'address', 'city', 'zipcode', 'serviceType', 'serviceDate', 'serviceTime']);
    
    // Validation
    let hasErrors = false;
    
    if (fullName.length < 3) {
        showError('nameError', 'Full name must be at least 3 characters');
        hasErrors = true;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('emailError', 'Please enter a valid email');
        hasErrors = true;
    }
    
    if (!phone.match(/^[0-9\s\-+()]+$/)) {
        showError('phoneError', 'Please enter a valid phone number');
        hasErrors = true;
    }
    
    if (address.length < 5) {
        showError('addressError', 'Please enter a valid address');
        hasErrors = true;
    }
    
    if (!city.trim()) {
        showError('cityError', 'City is required');
        hasErrors = true;
    }
    
    if (!zipcode.trim()) {
        showError('zipcodeError', 'Zip code is required');
        hasErrors = true;
    }
    
    if (!serviceType) {
        showError('serviceTypeError', 'Please select a service');
        hasErrors = true;
    }
    
    if (!serviceDate) {
        showError('serviceDateError', 'Please select a date');
        hasErrors = true;
    }
    
    if (!serviceTime) {
        showError('serviceTimeError', 'Please select a time');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                phone,
                address,
                city,
                zipcode,
                serviceType,
                serviceDate,
                serviceTime,
                additionalNotes,
                totalPrice
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccessMessage(`Booking confirmed! Booking ID: ${data.bookingId}. Redirecting...`);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        } else {
            showError('addressError', data.message);
        }
    } catch (error) {
        showError('addressError', 'Network error: ' + error.message);
    }
}



// ==================== HELPER FUNCTIONS ====================

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors(fieldNames) {
    fieldNames.forEach(field => {
        const errorElement = document.getElementById(field + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    });
}

function showSuccessMessage(message) {
    alert(message);
}

// Check if user is logged in
function checkUserLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        return user;
    }
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

