document.addEventListener("DOMContentLoaded", () => {
  // Load bookings
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const tbody = document.querySelector("#bookingTable tbody");

  if (bookings.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No bookings found.</td></tr>";
  } else {
    bookings.forEach(b => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${b.roomType}</td>
        <td>${b.checkin}</td>
        <td>${b.checkout}</td>
        <td>${b.guests}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Load feedback
  const feedbackList = document.getElementById("feedbackList");
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  if (feedbacks.length === 0) {
    feedbackList.innerHTML = "<p>No feedback available.</p>";
  } else {
    feedbacks.forEach(f => {
      const div = document.createElement("p");
      div.innerHTML = `<strong>${f.name}</strong> (${f.email}):<br>${f.message}`;
      feedbackList.appendChild(div);
    });
  }
});
