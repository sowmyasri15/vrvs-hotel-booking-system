document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll when clicking nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Optional: Show alert when "Book Now" clicked without login
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener("click", function (e) {
      const isLoggedIn = localStorage.getItem("isLoggedIn"); // You can set this on login
      if (!isLoggedIn) {
        alert("Please login to proceed with booking.");
        // Redirect to login page
        window.location.href = "login.html";
      }
    });
  });
});

