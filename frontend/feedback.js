document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  const feedbackEntry = {
    name,
    email,
    message
  };

  let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbackList.push(feedbackEntry);

  localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

  alert("✅ Thank you for your feedback!");

  this.reset();
});


