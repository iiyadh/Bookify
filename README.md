# Smart Appointment Management Platform  
A scalable, multi-business appointment booking system for managing services, schedules, users, and automated notifications.

---

## Live Demo / Preview  
**Live Demo:** [Click here](bookify-psi-three.vercel.app)
**Video Walkthrough:** [PLACEHOLDER – Add video link]

---

## Problem Statement  
Small businesses such as barbershops, gyms, clinics, and salons often rely on manual booking methods (phone calls, messages, spreadsheets), which leads to:

- Double bookings and scheduling conflicts  
- Poor visibility of daily and weekly schedules  
- Time wasted managing cancellations and confirmations  
- No centralized system for managing customers and services  
- Lack of reporting and operational insights  

These issues reduce productivity, impact customer experience, and limit business scalability.

---

## Solution Overview  
This project provides a centralized, web-based appointment management platform that allows customers to easily book services online while giving administrators full control over bookings, schedules, users, and reporting.

The system is designed to be reusable across multiple business types (barber shop, gym, doctor, salon) with the same core logic and configurable services.

It automates booking workflows, reminders, statistics, and administrative operations to improve efficiency and reliability.

---

## Key Features  

### User Features
- Account registration and authentication  
- Browse available services  
- Select date and time  
- Book appointments in real time  
- Receive booking confirmation and reminder emails  

### Admin Features
- View and manage incoming booking requests  
- Approve, decline, reset, and view request details  
- Filter appointments by status and search keywords  
- View counts of pending, approved, and canceled bookings  
- Export bookings as CSV for reporting  
- Full CRUD for services with filtering and search  
- Calendar view of appointments:
  - Select a date  
  - View all appointments for the selected day  
  - View appointment details  
- User management (block / unblock users)  
- Dashboard statistics and analytics  
- Automated email reminders using scheduled cron jobs  

### Platform Qualities
- Secure authentication and role-based access  
- Scalable architecture  
- Clean API structure  
- Automated background jobs  
- Optimized database queries  
- Production-ready code structure  

---

## Tech Stack  

**Frontend**
- React
- Vite
- Tailwind

**Backend**
- Node.js  
- Express.js  

**Database**
- MongoDB with Mongoose  

**Tools & Services**
- Nodemailer (email delivery)  
- Node-cron (scheduled jobs)  
- JWT authentication  
- Git & GitHub  
- REST API  

---

## Screenshots  

> [PLACEHOLDER – Add dashboard, calendar view, booking flow screenshots]

---

## Installation & Setup  

### Prerequisites
- Node.js (>= 18)  
- MongoDB  
- Git  

### Steps

```bash
# Clone repository
git clone https://github.com/iiyadh/Bookify.git

# Navigate into project
cd Bookify

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
````

Backend will run on:

```
http://localhost:5000
```

Frontend will run on:

```
http://localhost:5173

---

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173
```

> Adjust values based on your environment.

---

## API Documentation

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google/:token
POST /api/auth/facebook/:token
POST /api/auth/logout
GET /api/auth/checkAuth
```

### Password Retrive
```http
POST /api/password/forgot
POST /api/password/reset/:token
```



### Appointments

```http
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/date
GET    /api/appointments/user
PUT    /api/appointments/cancel/:id
PUT    /api/appointments/approve/:id
PUT    /api/appointments/reject/:id
PUT    /api/appointments/reset/:id
```

### Services

```http
GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```
### Users (Admin)

```http
GET   /api/users
put  /api/users/block/:id
put  /api/users/unblock/:id
```
> Full API documentation can be added using Swagger or Postman collections.

---

## Folder Structure

```text
project-root/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── cron/
│   ├── utils/
│   └── app.js
├── .env.example
├── package.json
└── README.md
```

---

## Architecture & Design Decisions

* **REST API architecture** for clear separation between frontend and backend.
* **MongoDB schema design** optimized for appointment filtering and population.
* **Role-based access control** to protect admin operations.
* **Cron jobs** for automated email reminders and background processing.
* **Modular folder structure** for maintainability and scalability.
* **Service abstraction layer** for email, scheduling, and business logic.
* **Indexing strategy** on frequently queried fields (date, status, user).

---

## Challenges & Learnings

* Designing a flexible data model that supports multiple business types.
* Preventing double bookings and ensuring data consistency.
* Handling time zones and date filtering correctly.
* Building reliable cron jobs without impacting performance.
* Structuring scalable backend architecture.
* Improving API performance and query optimization.

---

## Future Improvements

* Online payments integration
* SMS notifications
* Multi-branch support
* Admin role hierarchy
* Advanced analytics dashboard
* Mobile application
* Public booking widget for embedding on business websites
* WebSockets for real-time updates
---

## Contact Information

**Name:** Tabai Iyadh
**Role:** Full-Stack / Backend Developer
**Email:** tabaiiyadh317@gmail.com

> Available for freelance projects, long-term collaborations, and custom system development.

```
