# Sales Dashboard - CRUD Application

A simple sales management dashboard with full CRUD (Create, Read, Update, Delete) operations.

## Features
- ✅ Add new sales records
- ✅ View all sales records
- ✅ Update status (In Stock ↔ Finished)
- ✅ Delete records
- ✅ Responsive design
- ✅ Bootstrap styling

## Setup Instructions

### 1. Install JSON Server
```bash
npm install -g json-server
```

### 2. Run JSON Server
```bash
npx json-server --watch db.json --port 3000
```

This will start the server at `http://localhost:3000`

### 3. Open the Application
Open `index.html` in your browser

## CRUD Operations

### CREATE (POST)
- Fill in the form with product details
- Click "Add Record" button
- New record appears in the table

### READ (GET)
- Records automatically load when page opens
- Fetches from `http://localhost:3000/sales`

### UPDATE (PATCH)
- Click "Update Status" button
- Toggles between "In Stock" and "Finished"

### DELETE (DELETE)
- Click "Delete" button
- Confirms before deletion
- Record removed from table and database

## File Structure
```
├── index.html      (Main HTML file)
├── script.js       (JavaScript CRUD operations)
├── db.json         (JSON Server database)
└── README.md       (This file)
```

## API Endpoints
- GET all: `http://localhost:3000/sales`
- GET one: `http://localhost:3000/sales/:id`
- POST: `http://localhost:3000/sales`
- PATCH: `http://localhost:3000/sales/:id`
- DELETE: `http://localhost:3000/sales/:id`

## Technologies Used
- HTML5
- CSS3 (Bootstrap 5.3.8)
- JavaScript (Vanilla)
- JSON Server
- Bootstrap Icons