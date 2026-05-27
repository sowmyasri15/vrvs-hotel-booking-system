const booking = JSON.parse(localStorage.getItem("currentBooking"));

// CHECK BOOKING
if (!booking) {
  alert("No Booking Found");
  window.location.href = "booking.html";
}

// ROOM PRICES
const roomPrices = {
  Single: 1000,
  Double: 2000,
  King: 3000,
  Queen: 4000
};

// CALCULATE DAYS
const checkinDate = new Date(booking.checkIn);
const checkoutDate = new Date(booking.checkOut);

const diff = checkoutDate - checkinDate;

let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

if (days <= 0) {
  days = 1;
}

// TOTAL
const totalAmount =
  days * (roomPrices[booking.roomType] || 1000);

// SHOW BOOKING INFO
const bookingInfo = document.getElementById("bookingInfo");

if (bookingInfo) {
  bookingInfo.innerHTML = `
    <p>Room: ${booking.roomType}</p>
    <p>Days: ${days}</p>
    <p>Total: ₹${totalAmount}</p>
  `;
}

// PAYMENT FORM
document.getElementById("paymentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cardName = document.getElementById("cardName").value.trim();
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // VALIDATION
  if (!cardName || !cardNumber || !cvv) {
    alert("Fill all fields");
    return;
  }

  if (cardNumber.length !== 16) {
    alert("Card Number must be 16 digits");
    return;
  }

  if (cvv.length !== 3) {
    alert("CVV must be 3 digits");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: booking.username,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        cardName,
        cardNumber,
        amount: totalAmount
      })
    });

    const data = await response.json();

    console.log("PAYMENT RESPONSE:", data);

    if (data && data.success === true) {

      alert(data.message || "Payment Successful");

      // ✅ IMPORTANT FIX: attach totalAmount to booking
      const finalBooking = {
        ...booking,
        paymentStatus: "Paid",
        totalAmount: totalAmount
      };

      // SAVE IN LOCAL STORAGE (consistent key)
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(finalBooking);

      localStorage.setItem("bookings", JSON.stringify(bookings));

      // UPDATE CURRENT BOOKING TOO (for confirmation page)
      localStorage.setItem("currentBooking", JSON.stringify(finalBooking));

      window.location.href = "confirmation.html";

    } else {
      alert(data.message || "Payment Failed");
    }

  } catch (error) {
    console.log("PAYMENT ERROR:", error);
    alert("Payment Failed");
  }
});