# Admin Panel

A full-stack admin dashboard for managing categories, subcategories, and products with JWT authentication.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios

## Features

- **Authentication**: JWT-based login/logout with protected routes
- **Category Management**: CRUD operations for categories
- **Subcategory Management**: CRUD with category relationships
- **Product Management**: CRUD with category and subcategory relationships
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Validation**: Server-side validation with proper error handling

## Project Summary

### Backend Features
- **JWT Authentication**: Secure login with token-based auth, middleware protection
- **CRUD Operations**: Complete create, read, update, delete for Categories, Subcategories, and Products
- **Data Relationships**: Subcategories linked to Categories, Products linked to both Categories and Subcategories
- **Validation**: Server-side validation with proper error responses (e.g., prevent deletion with dependencies)
- **API Structure**: RESTful endpoints with consistent response formats

### Frontend Features
- **Authentication Flow**: Login page with JWT storage, protected routes, logout functionality
- **Dashboard Layout**: Responsive sidebar navigation with collapsible mobile menu
- **CRUD Pages**: Dedicated pages for managing Categories, Subcategories, and Products
- **Responsive UI**: Table/card layouts adapting to desktop and mobile screens
- **User Experience**: Loading states, error handling, confirmation modals for destructive actions
- **State Management**: React Context for authentication state, Axios interceptors for API calls

## Current Status: Complete

This version represents a fully functional admin dashboard with all core features implemented and tested. The codebase is clean, well-structured, and ready for production use or further development.

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/adminpanel
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start MongoDB (ensure it's running on your system)

5. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd admin-panel-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend root:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5174`

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing

### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL

## Screenshots

<!-- Add screenshots here -->

## Notes for Reviewers

- Ensure MongoDB is running before starting the backend
- The frontend requires the backend to be running for full functionality
- JWT tokens are stored in localStorage
- All CRUD operations include proper validation and error handling
- The UI is fully responsive and follows modern design principles