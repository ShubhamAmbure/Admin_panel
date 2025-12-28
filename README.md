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

<img width="1893" height="957" alt="Screenshot 2025-12-28 170338" src="https://github.com/user-attachments/assets/530b0499-9af4-4c31-9039-7d36d9006d39" />

<img width="1887" height="947" alt="Screenshot 2025-12-28 170432" src="https://github.com/user-attachments/assets/52962cdd-53be-45f9-a1f6-df1b4c9ed90f" />
<img width="1911" height="970" alt="Screenshot 2025-12-28 170706" src="https://github.com/user-attachments/assets/72c91f1c-4331-4b70-b099-55b096110877" />

<img width="1918" height="969" alt="Screenshot 2025-12-28 170739" src="https://github.com/user-attachments/assets/2078b549-0f6d-4e8c-bbb2-935628574c18" />
<img width="1917" height="963" alt="Screenshot 2025-12-28 170757" src="https://github.com/user-attachments/assets/28563c10-db60-4b56-95da-75c6f61f31bb" />
<img width="1902" height="947" alt="Screenshot 2025-12-28 170856" src="https://github.com/user-attachments/assets/f37a77d9-fedd-421f-ba67-ae51aed2b161" />

<img width="1888" height="948" alt="Screenshot 2025-12-28 170921" src="https://github.com/user-attachments/assets/502f3772-67e8-448c-abd8-203207d62d9c" />

<img width="1885" height="955" alt="Screenshot 2025-12-28 170946" src="https://github.com/user-attachments/assets/833abde9-d27e-4da5-8f24-f2f115c74677" />
<img width="1886" height="951" alt="Screenshot 2025-12-28 171010" src="https://github.com/user-attachments/assets/692d8c4d-4353-463e-a6af-24455e000da6" />
<img width="1896" height="943" alt="Screenshot 2025-12-28 171027" src="https://github.com/user-attachments/assets/fa35f54e-fc78-488b-a883-b835463ca396" />
<img width="1897" height="959" alt="Screenshot 2025-12-28 171042" src="https://github.com/user-attachments/assets/3bcf1882-3fdb-4a82-b314-a12beb3d07c5" />


## Notes for Reviewers

- Ensure MongoDB is running before starting the backend
- The frontend requires the backend to be running for full functionality
- JWT tokens are stored in localStorage
- All CRUD operations include proper validation and error handling
- The UI is fully responsive and follows modern design principles
