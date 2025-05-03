// frontend/js/dashboard.js

document.addEventListener("DOMContentLoaded", fetchRides);

async function fetchRides() {
  const res = await fetch("http://localhost:5000/api/rides");
  const data = await res.json();
  const list = document.getElementById("ridesList");

  list.innerHTML = "";
  data.forEach((ride) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>From: ${ride.from} | To: ${ride.to} | Time: ${new Date(ride.time).toLocaleString()}</p>
      <p>Seats Left: ${ride.availableSeats}</p>
      <button onclick="joinRide('${ride._id}')">Join</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("createRideForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/rides/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      time: document.getElementById("time").value,
      availableSeats: document.getElementById("availableSeats").value,
    }),
  });

  const data = await res.json();
  alert(data.msg || "Ride created");
  fetchRides(); // refresh list
});

async function joinRide(rideId) {
  const userId = localStorage.getItem("userId");

  const res = await fetch(`http://localhost:5000/api/rides/join/${rideId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  alert(data.msg || "Joined ride!");
  fetchRides();
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
