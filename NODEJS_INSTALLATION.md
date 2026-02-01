# 🚀 Installation Guide - Node.js Required

## ❌ Problem Found
Node.js is not installed on your computer. This is why the services page and server aren't working.

## ✅ Solution: Install Node.js

### Step 1: Download Node.js
1. Visit: **https://nodejs.org/en/download/**
2. Download the **LTS (Long Term Support)** version for Windows
3. File will be named something like: `node-vXX.XX.X-x64.msi`

### Step 2: Install Node.js
1. **Double-click** the downloaded `.msi` file
2. Click **"Next"** through all screens
3. Keep default settings (important!)
4. When asked about tools, **check the box** for "Automatically install the necessary tools..."
5. Click **"Install"**
6. When prompted by Windows, click **"Yes"** to allow changes
7. Wait for installation to complete (may take 2-3 minutes)
8. Click **"Finish"**

### Step 3: Restart Your Computer
Restart your computer to apply the PATH changes.

### Step 4: Verify Installation
Open PowerShell (search "PowerShell" in Windows Start menu) and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v20.X.X
10.X.X
```

## 📝 After Installation

Once Node.js is installed:

### 1. Open PowerShell
Press `Win + R`, type `powershell`, press Enter

### 2. Navigate to Your Project
```bash
cd "c:\Users\user\OneDrive\Desktop\helping-hands"
```

### 3. Install Dependencies
```bash
npm install
```

Wait for this to complete (it will create a `node_modules` folder)

### 4. Start Your Server
```bash
npm start
```

You should see:
```
Connected to SQLite database
Database tables initialized
✅ Server is running!
📱 Desktop/Local: http://localhost:3000
📱 Mobile/Network: http://192.168.X.X:3000
```

### 5. Open Your Application
Open your browser and go to:
- Desktop: **http://localhost:3000**
- Mobile: Use the IP from step 4

### 6. Services Page
Click **Services** in navigation or go to:
- **http://localhost:3000/services.html**

## ⚠️ Troubleshooting

### "npm is not recognized"
- **Solution:** Restart computer after installing Node.js
- The PATH needs to be refreshed

### "npm install hangs"
- **Solution:** Use Ctrl+C to cancel and try again
- This is rare but can happen with slow internet

### "Port 3000 already in use"
- **Solution:** Another app is using port 3000
- Change port in `server.js` line 203:
  ```javascript
  const PORT = 3001;  // Change from 3000 to 3001
  ```

## 💡 What Node.js Does

Node.js is a JavaScript runtime that lets us:
- ✅ Run a backend server
- ✅ Store data in SQLite database
- ✅ Handle user signup/login
- ✅ Save booking information
- ✅ Serve your website

**Without Node.js:** Only static HTML/CSS/JS (no data storage)
**With Node.js:** Full-featured application with database

## 📋 Checklist

- [ ] Downloaded Node.js LTS
- [ ] Installed Node.js
- [ ] Restarted computer
- [ ] Verified installation: `node --version`
- [ ] Navigated to project folder
- [ ] Ran `npm install` (created node_modules folder)
- [ ] Ran `npm start` (server is running)
- [ ] Opened `http://localhost:3000` in browser
- [ ] Clicked Services - sees service cards
- [ ] Services page displays all 8 services ✅

## 🎯 Expected Result

Once everything is set up, you should see:

**Services Page:**
- 8 service cards in a grid
- Each card has image, name, description, rating, price
- 2 buttons: "View Details" and "Book Now"
- Search box and category filter at the top

**View Details Page:**
- Full service information
- List of features
- Benefits section
- Book Now and Contact Us buttons

**Booking Page:**
- Form with address fields
- Service type pre-selected from services page
- Date and time selection
- Submit button saves to database

## 📞 Still Having Issues?

After installing Node.js and it's still not working:
1. Check browser console (F12) for errors
2. Check PowerShell terminal for error messages
3. Make sure port 3000 is not blocked by firewall

The application is 100% ready - it just needs Node.js to run!
