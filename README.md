# Book Management System

A **Book Management System** built with a **Node.js backend** and a **React.js frontend**, featuring user authentication and CRUD operations for managing books. This application uses **MongoDB** as the database and includes a responsive UI designed with **Bootstrap**.

---

## Features

### General
- Responsive frontend using **React.js** and **Bootstrap**.
- Backend powered by **Node.js** without **Express** 
- Secure **user authentication** with JWT and hashed passwords.
- CRUD operations for book management (add, update, delete, list).
- Role-based features (e.g., Admin, User) can be extended in the future.

### User Authentication
- Login and Registration combined into a single UI component.
- Protected routes to restrict access to authenticated users.
- Persistent login sessions using JWT stored in `localStorage`.

### API Features
- RESTful APIs for book management and authentication.
- Secure routes with JWT verification.
- Comprehensive error handling and descriptive responses.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (`v14.x` or later)
- npm (`v6.x` or later)
- MongoDB Atlas or a local MongoDB instance

### Steps to Set Up
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AldrenJoseph47/book-management-system.git
   cd book-management-system



### LICENSE
This project is licensed under the MIT License. See the LICENSE file for details.

