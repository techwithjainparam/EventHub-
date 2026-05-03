# 🚀 EventHub - Full Stack Event Booking Platform

EventHub is a full-stack **MERN (MongoDB, Express, React, Node.js)** application that enables users to browse events, book tickets, and securely manage reservations with OTP-based authentication and admin-controlled approval workflows.

Admins can create and manage events, monitor bookings, and manually confirm payments, making the system flexible for both free and paid events.

## ✨ Features

### 🔐 Authentication & Security

* JWT-based secure authentication
* Password hashing using bcrypt
* Email OTP verification for:

  * Account activation
  * Booking confirmation (2FA security layer)
### 👤 Role-Based Access Control

* **Admin**

  * Create, update, delete events
  * Approve / reject booking requests
  * Mark payments as *Paid / Not Paid*
  * Access analytics dashboard
* **User**

  * Browse events
  * Book tickets securely via OTP
  * View booking status
  * Cancel bookings

### 🎟️ Event Management

* Create free & paid events
* Add event details (title, description, date, category, capacity, image URL)
* Real-time seat availability validation
* Prevents overbooking

### 📊 Admin Dashboard
* Live analytics:

  * Pending booking requests
  * Total revenue
  * Confirmed paid users
* Centralized booking control system

### 📧 Email System

* Automated emails using Nodemailer
* OTP delivery for:

  * Registration
  * Booking confirmation

### 🎨 UI/UX

* Modern UI built with React + Tailwind CSS
* Responsive design
* Smooth micro-interactions

## 🛠️ Tech Stack

**Frontend**

* React.js (Vite)
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer

## 📦 Installation & Setup

### ⚙️ Prerequisites

* Node.js installed
* MongoDB Atlas or local MongoDB setup
* Gmail App Password (for email OTP system)

## 🔐 Environment Variables

Create a `.env` file inside the `server/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey_eventhub
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```
> ⚠️ Use Gmail **App Password**, normal password will NOT work.

## 🚀 Run the Project

### 1️⃣ Install Dependencies (Root)

```bash
npm install
npm run install:all
```

### 2️⃣ Start Full Application (Recommended)

```bash
npm run dev
```

This runs:

* Backend → [http://localhost:5000](http://localhost:5000)
* Frontend → [http://localhost:5173](http://localhost:5173) (Vite)

## 🧩 Alternative Manual Setup

### Backend

```bash
cd server
npm install --legacy-peer-deps
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 📁 Project Structure

```
EventHub/
│
├── client/        # React Frontend
├── server/        # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── .env
│
├── package.json
└── README.md
```

## 🔒 Security Highlights

* OTP-based verification (2-step booking)
* Protected admin routes
* JWT authentication middleware
* Password encryption using bcrypt
* Seat overbooking prevention logic

## 📈 Future Improvements

* Payment gateway integration (Razorpay/Stripe)
* Real-time notifications (Socket.io)
* QR-based event tickets
* Mobile app version
