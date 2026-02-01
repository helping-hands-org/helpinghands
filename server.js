const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== DATABASE SETUP ====================
const dbPath = path.join(__dirname, 'helping_hands.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database at:', dbPath);
        initializeDatabase();
    }
});


function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT NOT NULL,
            password TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            zipcode TEXT NOT NULL,
            serviceType TEXT NOT NULL,
            serviceDate TEXT NOT NULL,
            serviceTime TEXT NOT NULL,
            additionalNotes TEXT,
            totalPrice REAL,
            status TEXT DEFAULT 'Pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Database tables initialized');
}

// ==================== API TEST ROUTE ====================
app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'API working correctly' });
});

// ==================== USER ROUTES ====================

// SIGNUP
app.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, phone, password, confirmPassword } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (fullName, email, phone, password)
             VALUES (?, ?, ?, ?)`,
            [fullName, email, phone, hashedPassword],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ success: false, message: 'Email already exists' });
                    }
                    return res.status(500).json({ success: false, message: 'Error creating account' });
                }

                res.status(201).json({
                    success: true,
                    message: 'Account created successfully',
                    userId: this.lastID
                });
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// LOGIN
app.post('/api/login', async (req, res) => {
    console.log('🔐 Login API hit with:', req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone
                }
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== BOOKING ROUTES ====================

// CREATE BOOKING
app.post('/api/booking', (req, res) => {
    const {
        fullName, email, phone, address,
        city, zipcode, serviceType,
        serviceDate, serviceTime,
        additionalNotes, totalPrice
    } = req.body;

    if (!fullName || !email || !phone || !address || !city || !zipcode || !serviceType || !serviceDate || !serviceTime) {
        return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    db.run(
        `INSERT INTO bookings 
        (fullName, email, phone, address, city, zipcode, serviceType, serviceDate, serviceTime, additionalNotes, totalPrice)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, address, city, zipcode, serviceType, serviceDate, serviceTime, additionalNotes || '', totalPrice],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error creating booking' });
            }
            res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                bookingId: this.lastID
            });
        }
    );
});

// GET ALL BOOKINGS
app.get('/api/bookings', (req, res) => {
    db.all(`SELECT * FROM bookings ORDER BY createdAt DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error fetching bookings' });
        }
        res.json({ success: true, bookings: rows });
    });
});

// ==================== STATIC FILES (LAST) ====================
// 
app.use(express.static(path.join(__dirname, 'public')));

// ==================== SERVER START ====================
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ Server running successfully`);
    console.log(`💻 Local: http://localhost:${PORT}`);
    console.log(`📱 Mobile: http://${localIP}:${PORT}\n`);
});
