// CHECK LOGIN (SAFE FIX)
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Please Login First");
  window.location.href = "login.html";
}

// SHOW USERNAME (SAFE CHECK)
const usernameInput = document.getElementById("username");
if (usernameInput) {
  usernameInput.value = localStorage.getItem("username") || "";
}

// FORM SUBMIT
document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = localStorage.getItem("username");

  const roomType = document.getElementById("roomType").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const guests = document.getElementById("guests").value;

  // VALIDATION
  if (!roomType || !checkIn || !checkOut || !guests) {
    alert("Please fill all fields");
    return;
  }

  if (!username) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
    return;
  }

  const bookingData = {
    username,
    roomType,
    checkIn,
    checkOut,
    guests,
    paymentStatus: "Pending"
  };

  try {
    const response = await fetch("http://localhost:5000/book-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    // SAFE RESPONSE CHECK
    if (data && data.success === true) {

      localStorage.setItem(
        "currentBooking",
        JSON.stringify(bookingData)
      );

      alert(data.message || "Booking Successful!");

      window.location.href = "payment.html";

    } else {
      alert(data.message || "Booking Failed");
    }

  } catch (error) {
    console.log("BOOKING ERROR:", error);
    alert("Server Error");
  }
});