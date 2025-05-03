// frontend/js/auth.js

// Signup Form Submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.getElementById("gender").value,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.msg || "Signed up successfully!");
      window.location.href = "login.html";
    } else {
      alert(data.error || "Signup failed");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    alert("An error occurred during signup.");
  }
});

// Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.msg || "Logged in successfully!");
      localStorage.setItem("userId", data.userId); // Save userId for session
      window.location.href = "dashboard.html";
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("An error occurred during login.");
  }
});
