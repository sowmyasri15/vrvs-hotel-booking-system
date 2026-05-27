document.addEventListener("DOMContentLoaded", () => {
  const bookingList = document.getElementById("bookingList");
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const roomImages = {
    "Single": "single.jpg",
    "Double": "double.jpg",
    "King": "king.jpg",
    "Queen": "queen.jpg"
  };

  if (bookings.length === 0) {
    bookingList.innerHTML = "<p style='text-align:center;'>No bookings found.</p>";
  } else {
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Room</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Guests</th>
        </tr>
      </thead>
      <tbody>
        ${bookings.map(b => `
          <tr>
            <td><img src="${roomImages[b.roomType] || 'images/default.jpg'}" alt="${b.roomType}" /></td>
            <td>${b.checkin}</td>
            <td>${b.checkout}</td>
            <td>${b.guests}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    bookingList.appendChild(table);
  }
});
