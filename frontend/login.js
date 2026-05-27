document.getElementById("loginForm")
.addEventListener("submit", async function (e) {

  e.preventDefault();

  const username =
  document.getElementById("username").value.trim();

  const password =
  document.getElementById("password").value.trim();

  if (username === "" || password === "") {

    alert("All fields are required!");

    return;
  }

  try {

    const response =
    await fetch("http://localhost:5000/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        username,
        password

      })

    });

    const data =
    await response.json();

    if (data.success) {

      // save login status
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // save username
      localStorage.setItem(
        "username",
        username
      );

      alert(data.message);

      // redirect
      window.location.href =
      "index.html";

    }

    else {

      alert(data.message);

    }

  }

  catch (err) {

    console.log(err);

    alert("Server Error");

  }

});