# Helping Hands - Data Storage Setup Guide

## Overview
Your application now has a complete backend system to store user data for:
- **User Signup/Login** - Secure authentication with password hashing
- **Service Bookings** - Store booking information with service details
- **SQLite Database** - Local data persistence

## File Structure
```
helping-hands/
├── server.js              # Node.js backend server
├── package.json           # Node.js dependencies
├── helping_hands.db       # SQLite database (created automatically)
├── js/
│   ├── main.js           # Original frontend logic
│   └── api.js            # New API calls for data storage
├── signup.html           # Updated with API calls
├── login.html            # Updated with API calls
├── booking.html          # Updated with API calls
└── [other files...]
```

## Setup Instructions

### Step 1: Install Node.js
If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies
Navigate to your project folder and run:
```bash
cd "c:\Users\user\OneDrive\Desktop\helping-hands"
npm install
```

This installs:
- **express** - Web server framework
- **sqlite3** - Database
- **cors** - Handle cross-origin requests
- **bcryptjs** - Secure password hashing

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
Connected to SQLite database
Database tables initialized
Server is running on http://localhost:3000
```

### Step 4: Test the Application
Open your browser and go to `http://localhost:3000`

The application will:
1. Serve all HTML, CSS, and JS files
2. Handle user signup and login
3. Store booking information
4. Create a SQLite database automatically

## API Endpoints

### User Authentication

**Sign Up**
```
POST /api/signup
Body: {
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "password": "password123",
  "confirmPassword": "password123"
}
Response: { "success": true, "userId": 1 }
```

**Login**
```
POST /api/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: { 
  "success": true, 
  "user": { 
    "id": 1, 
    "fullName": "John Doe", 
    "email": "john@example.com" 
  } 
}
```

### Bookings

**Create Booking**
```
POST /api/booking
Body: {
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "address": "123 Main St",
  "city": "New York",
  "zipcode": "10001",
  "serviceType": "Plumbing",
  "serviceDate": "2024-02-15",
  "serviceTime": "9:00 AM - 12:00 PM",
  "additionalNotes": "Fix the kitchen sink",
  "totalPrice": 500
}
Response: { "success": true, "bookingId": 1 }
```

**Get All Bookings** (for admin)
```
GET /api/bookings
Response: { "success": true, "bookings": [...] }
```

**Get Booking by ID**
```
GET /api/booking/:id
Response: { "success": true, "booking": {...} }
```

**Update Booking Status**
```
PUT /api/booking/:id
Body: { "status": "Completed" }
Response: { "success": true, "message": "Booking updated successfully" }
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fullName TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  password TEXT (hashed),
  createdAt DATETIME
)
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  fullName TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  zipcode TEXT,
  serviceType TEXT,
  serviceDate TEXT,
  serviceTime TEXT,
  additionalNotes TEXT,
  totalPrice REAL,
  status TEXT,
  createdAt DATETIME
)
```

## Security Features

✅ **Password Hashing** - Passwords are hashed using bcryptjs
✅ **Email Validation** - Ensures valid email format
✅ **CORS Protection** - Prevents unauthorized cross-origin requests
✅ **SQL Injection Protection** - Uses parameterized queries
✅ **Input Validation** - All inputs are validated

## How Data is Stored

1. **Signup Process:**
   - User enters details on signup.html
   - JavaScript validates input locally
   - Sends POST request to `/api/signup`
   - Server hashes password and stores in database
   - Returns success/error message

2. **Login Process:**
   - User enters email and password
   - Server retrieves user from database
   - Compares hashed passwords using bcryptjs
   - Returns user data on success
   - User data is stored in browser's localStorage for session

3. **Booking Process:**
   - User fills booking form with service details
   - Data is sent to `/api/booking`
   - Server validates and stores in bookings table
   - Returns booking ID for confirmation

## Local Storage

User session data is stored in browser's localStorage:
```javascript
localStorage.getItem('currentUser') // Returns logged-in user info
localStorage.removeItem('currentUser') // Clears on logout
```

## Troubleshooting

**Port 3000 already in use?**
- Edit `server.js` and change `const PORT = 3000;` to another port
- Then update `API_BASE_URL` in `js/api.js` to match

**Database errors?**
- Delete `helping_hands.db` and restart the server to recreate fresh database

**CORS errors?**
- Make sure the server is running on http://localhost:3000
- Don't open HTML files directly; always use the server URL

## Next Steps

1. ✅ Setup complete - your data storage is ready!
2. Test signup, login, and booking with sample data
3. To view stored data, you can use SQLite tools like DB Browser for SQLite
4. Consider adding:
   - Email notifications
   - Payment integration
   - Admin dashboard to view bookings
   - Password reset functionality

## Questions?
Review the code in `server.js` and `js/api.js` to understand how data flows through the system.
