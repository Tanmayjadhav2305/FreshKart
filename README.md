# FreshKart

A full-stack grocery shopping application built with the MERN stack.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Image Storage**: Cloudinary

## Features
- **User**: Browse products, Search/Filter, Add to Cart (with units kg/g), Checkout (dummy), Order History.
- **Admin**: Dashboard, Manage Products (Add/Edit/Delete), Manage Orders (Update Status), Image Upload.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas URI
- Cloudinary Account

### 1. Environment Variables
Create a `.env` file in the `backend/` directory with the following content:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_uri>
JWT_SECRET=your_jwt_secret_123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Install Dependencies
Run the following in the root directory (or separately in backend/frontend):

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Seed Database (Optional)
To import sample data (Admin user and dummy products):
```bash
cd backend
npm run data:import
```
*Default Admin Login:*
- Email: `admin@example.com`
- Password: `password` (Note: Ensure the password matches what you set in `backend/data/users.js`, practically `123456` hash is recommended, or check code). 
*Note: In this demo, the seeder uses plain text `password` which will be hashed if using the User model creation logic, but `insertMany` skips pre-save hooks. PRO TIP: Register a new user via UI and manually set `isAdmin: true` in MongoDB for the first admin, or update the seeder to use `User.create` loop.*

### 4. Run the App
**Backend:**
```bash
cd backend
npm run server
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.
