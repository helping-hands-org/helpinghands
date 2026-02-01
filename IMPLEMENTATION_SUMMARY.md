# Helping Hands - Data Storage Implementation

## What Was Added

You now have a complete data storage system with:

### 1. **Backend Server** (`server.js`)
- Express.js web server running on port 3000
- SQLite database for persistent data storage
- RESTful API endpoints for user auth and bookings
- Password encryption using bcryptjs
- Input validation and error handling

### 2. **API Layer** (`js/api.js`)
- JavaScript functions that handle form submissions
- Validates data before sending to server
- Makes API calls to backend
- Manages user sessions with localStorage
- Provides error messages to users

### 3. **Database**
- Automatic SQLite database creation
- Two main tables: Users and Bookings
- Stores all signup, login, and booking information
- Secure password hashing

### 4. **Updated HTML Files**
- Added API script references to signup.html, login.html, booking.html
- Forms now properly submit to backend instead of doing nothing

## How to Use

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   - Go to `http://localhost:3000`
   - All your HTML files are now served by the backend

### Data Flow

```
User Form Input
    ↓
JavaScript Validation (api.js)
    ↓
POST/PUT Request to Server
    ↓
Server Validation (server.js)
    ↓
Database Storage (helping_hands.db)
    ↓
Response to Browser
    ↓
Success/Error Message to User
```

## Key Features

✅ **User Registration** - Secure signup with password hashing
✅ **User Login** - Authentication with email/password
✅ **Service Bookings** - Store all booking details
✅ **Input Validation** - Both client-side and server-side
✅ **Error Handling** - User-friendly error messages
✅ **Session Management** - Keep users logged in with localStorage
✅ **CORS Support** - Safe cross-origin requests

## Available Data

The system stores:

**Users:**
- Full name, email, phone
- Password (encrypted)
- Account creation date

**Bookings:**
- Customer details (name, email, phone)
- Service address and location
- Service type and date
- Preferred time slot
- Special notes
- Total price
- Booking status

## Accessing Data

### View data in browser console:
```javascript
// Check current user
console.log(JSON.parse(localStorage.getItem('currentUser')))

// Clear user session
localStorage.removeItem('currentUser')
```

### View database with SQLite tools:
- Download: https://sqlitebrowser.org/
- Open file: `helping_hands.db` in your project folder

## File Locations

```
project-root/
├── server.js              ← Backend server
├── package.json           ← Dependencies  
├── helping_hands.db       ← Database (auto-created)
├── js/
│   ├── api.js            ← API calls (NEW)
│   └── main.js           ← Frontend logic
├── signup.html           ← Updated with api.js
├── login.html            ← Updated with api.js
├── booking.html          ← Updated with api.js
└── SETUP_GUIDE.md        ← Detailed setup guide
```

## API Endpoints Summary

- `POST /api/signup` - Register new user
- `POST /api/login` - Login user
- `POST /api/booking` - Create booking
- `GET /api/bookings` - Get all bookings
- `GET /api/booking/:id` - Get specific booking
- `PUT /api/booking/:id` - Update booking status

## Next Steps

1. Run `npm install` and `npm start`
2. Test each form (signup, login, booking)
3. View stored data using SQLite Browser
4. Customize as needed
5. Ready for deployment when needed!

For detailed setup instructions, see `SETUP_GUIDE.md`
