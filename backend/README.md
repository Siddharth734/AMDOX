# 🏢 Amdox ERP Backend System

## 📌 Project Overview
This is a backend ERP system built using Node.js and Express.  
It supports multi-tenant architecture and includes modules for:

- Authentication (JWT-based login system)
- User Management
- Tenant Management
- Inventory Management
- GRN (Goods Receipt Note)
- Payroll (basic structure)
- Attendance & Leave
- Journal Entries
- Notification Service (mock-based)
- Audit Service

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- JWT Authentication
- Bcrypt (password hashing)
- In-memory Mock Database (no external DB used)

---

## 🔐 Authentication Flow
- Login generates Access Token + Refresh Token
- Protected routes use JWT middleware
- Refresh token used for session renewal
- Logout invalidates refresh token

---

## 📂 Project Structure
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── routes/
 ├── middleware/
 ├── utils/
 └── index.js

---

## 📡 API Modules

### Auth APIs
- POST /api/auth/login
- POST /api/auth/refresh-token
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### User APIs
- POST /api/users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- PATCH /api/users/:id/role
- PATCH /api/users/:id/deactivate

### Tenant APIs
- POST /api/tenants
- GET /api/tenants

### Other Modules
- /api/inventory
- /api/grn
- /api/payroll
- /api/attendance
- /api/leaves
- /api/journal

---

## 🧪 Testing
All APIs were tested using Postman.

- Authentication flow verified
- CRUD operations verified
- Role-based access tested
- Token validation tested

---

## 🚀 How to Run

```bash
npm install
node src/index.js