// frontend/js/auth.js

document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.getElementById("gender").value
      }),
    });
  
    const data = await res.json();
    alert(data.msg || "Signed up!");
    if (res.ok) window.location.href = "login.html";
  });
  