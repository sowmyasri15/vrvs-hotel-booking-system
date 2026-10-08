# VRVS Hotel Booking System

A full-stack hotel booking application built for room reservation, booking management, and a simulated payment workflow. The project combines a static frontend with an Express + MongoDB backend to provide a complete booking experience.

---

## Project Overview

VRVS Hotel Booking System is a full-stack hotel reservation platform designed for users to browse room options, register or log in, choose dates and guest count, create a booking, and complete a demo payment flow. The application stores booking and payment information in MongoDB and presents the user booking summary and dashboard details through the frontend.

This project is suitable for a college portfolio and demonstrates a complete end-to-end booking workflow using the frontend, backend API, and database integration.

---

## Features

The following features are implemented in the current codebase:

- User registration
- User login
- Hotel room listing and room gallery
- Room type selection (Single, Double, King, Queen)
- Check-in and check-out date selection
- Number of guests selection
- Booking creation
- Demo payment form with validation
- Booking confirmation page
- User dashboard showing bookings
- Booking cancellation functionality
- MongoDB-backed data persistence

---

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript
- Static web pages served from the frontend folder

### Backend

- Node.js
- Express.js
- Mongoose
- bcryptjs
- cors
- dotenv
- nodemon

### Database

- MongoDB
- MongoDB Atlas for deployment database hosting

### Deployment

- Render Static Site for the frontend
- Render Web Service for the backend
- GitHub repository for source control

---

## Project Structure

```text
vrvs-hotel-booking-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── paymentController.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Payment.js
│   │   ├── Room.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── paymentRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── admin.css
│   ├── admin.html
│   ├── admin.js
│   ├── booking-list.css
│   ├── booking-list.html
│   ├── booking-list.js
│   ├── booking.css
│   ├── booking.html
│   ├── booking.js
│   ├── confirmation.css
│   ├── confirmation.html
│   ├── confirmation.js
│   ├── config.js
│   ├── dashboard.html
│   ├── feedback.css
│   ├── feedback.html
│   ├── feedback.js
│   ├── frontpage.css
│   ├── frontpage.html
│   ├── frontpage.js
│   ├── index.html
│   ├── login.css
│   ├── login.html
│   ├── login.js
│   ├── payment.css
│   ├── payment.html
│   ├── payment.js
│   ├── registration.css
│   ├── registration.html
│   ├── style.css
│   └── ...
├── images/
├── .gitignore
├── README.me
├── README.md
└── .git/
```

> The current implementation defines the main API routes directly in the backend server file, while the route files under backend/routes are present as part of the project structure.

---

## Application Workflow

The actual flow implemented in this project is:

1. User opens the frontend landing page.
2. User registers or logs in through the frontend.
3. The frontend sends requests to the backend API for registration and login.
4. The user selects a room type, check-in date, check-out date, and number of guests.
5. The frontend submits a booking to the backend.
6. The backend saves the booking record in MongoDB.
7. The user proceeds to the payment page.
8. The frontend validates the payment form and sends the payment request.
9. The backend saves the payment document and updates the booking status to Paid.
10. The confirmation page shows the final booking summary.
11. The dashboard lists the user’s bookings and allows cancellation.

Flow summary:

User → Frontend → Backend API → MongoDB → Booking/Payment → Confirmation

---

## Backend / API

The backend is built with Node.js and Express and serves the application logic for authentication, room listing, booking management, and payment simulation.

The project currently exposes the following API endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Returns a basic API status message |
| GET | `/health` | Health check endpoint |
| POST | `/register` | Registers a new user |
| POST | `/login` | Logs in a user |
| GET | `/rooms` | Fetches all room records |
| POST | `/book-room` | Creates a booking |
| POST | `/payment` | Saves payment data and updates booking payment status |
| GET | `/my-bookings/:username` | Fetches bookings for a specific user |
| DELETE | `/cancel-booking/:id` | Deletes a booking record |

Important implementation notes:

- The backend uses `backend/server.js` for the main API logic.
- MongoDB is connected using `backend/config/db.js` and the `MONGO_URI` environment variable.
- Room data is seeded automatically if the database is empty.
- The current code does not implement JWT authentication or real payment gateway integration.

---

## Database

MongoDB is used as the main persistence layer for this project.

The application connects to MongoDB through the database configuration in `backend/config/db.js` using `process.env.MONGO_URI`.

The database models are:

- `User` model
  - `name`
  - `email`
  - `username`
  - `password`

- `Room` model
  - `roomType`
  - `price`
  - `image`
  - `description`

- `Booking` model
  - `username`
  - `roomType`
  - `checkIn`
  - `checkOut`
  - `guests`
  - `totalAmount`
  - `paymentStatus`

- `Payment` model
  - `username`
  - `roomType`
  - `checkIn`
  - `checkOut`
  - `cardName`
  - `cardNumber`
  - `amount`
  - `status`

The backend seeds room records if the `Room` collection is empty, using room types such as Single, Double, King, and Queen.

---

## Payment

The current payment implementation is a DEMO/SIMULATED payment flow.

- The frontend displays a payment form with cardholder name, card number, expiry date, and CVV.
- The form performs client-side validation before sending the request.
- The backend receives the payment request and saves it in the `Payment` collection.
- The booking status is then updated to `Paid`.
- The project does not integrate a real payment gateway such as Stripe or Razorpay.

This is intentionally a simulated payment flow for demonstration and learning purposes.

---

## Deployment

The project is configured for deployment on Render:

- Frontend: Render Static Site
  - https://vrvs-hotel-booking-frontend.onrender.com

- Backend: Render Web Service
  - https://vrvs-hotel-booking-system.onrender.com

- Database: MongoDB Atlas

The frontend uses a shared configuration file, `frontend/config.js`, to define the API base URL for communication with the backend. The current default is the live Render backend URL.

---

## Installation and Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/sowmyasri15/vrvs-hotel-booking-system.git
cd vrvs-hotel-booking-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder with the required MongoDB connection string.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

> Do not commit real secrets or credentials to the repository.

### 4. Start the backend

```bash
npm start
```

For development mode:

```bash
npm run dev
```

### 5. Start the frontend locally

The frontend is a static website. You can open the HTML files directly, or serve the `frontend` folder locally:

```bash
cd ../frontend
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If the backend is running on a different local URL, update the value in `frontend/config.js` accordingly.

---

## Environment Variables

The backend requires the following environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string for the database |
| `PORT` | Optional | Backend server port; defaults to 5000 if not set |

No production credentials or secrets should be stored in the repository.

---

## Screenshots

Screenshots are not stored in the repository at the moment. Add them in a future update if needed.

Planned placeholders:

- Homepage screenshot
- Login/Register page screenshot
- Room booking page screenshot
- Payment page screenshot
- Confirmation page screenshot
- Dashboard screenshot

---

## Future Enhancements

The following are realistic future improvements and are not part of the current implementation:

- Real payment gateway integration (Stripe, Razorpay, etc.)
- Stronger user authentication and authorization
- Email booking confirmation
- Admin dashboard for managing rooms and reservations
- Room availability management
- Booking cancellation and refund handling
- Better validation and error handling
- Cloud hosting improvements and CI/CD automation

---

## Author

Anumula Sowmya Sri  
B.Tech Computer Science Engineering  
MLR Institute of Technology

GitHub: https://github.com/sowmyasri15  
LinkedIn: https://linkedin.com/in/sowmyasri-anumula

---

## License

This project is shared for academic and portfolio purposes.
