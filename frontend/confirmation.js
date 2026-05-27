// Get all bookings from localStorage
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Get last booking
const lastBooking = bookings[bookings.length - 1];

// Show booking details
if (!lastBooking) {

  document.getElementById("bookingSummary").innerHTML =
    "<p>No booking found.</p>";

} else {

  document.getElementById("bookingSummary").innerHTML = `
    <p><strong>Room Type:</strong> ${lastBooking.roomType}</p>
    <p><strong>Check-in:</strong> ${lastBooking.checkIn}</p>
    <p><strong>Check-out:</strong> ${lastBooking.checkOut}</p>
    <p><strong>Guests:</strong> ${lastBooking.guests}</p>
    <p><strong>Total Amount:</strong> ₹${lastBooking.totalAmount}</p>
  `;
}

// Dashboard navigation
function goDashboard() {
  window.location.href = "dashboard.html";
}


