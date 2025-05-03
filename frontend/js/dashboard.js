// Fetch Available Rides
async function fetchAvailableRides() {
    try {
      const res = await fetch("http://localhost:5000/api/ride/available");
      if (!res.ok) {
        throw new Error("Failed to fetch available rides");
      }
  
      const data = await res.json();
      const container = document.getElementById("ride-container");
      container.innerHTML = ""; // Clear previous rides
  
      data.rides.forEach((ride) => {
        const div = document.createElement("div");
        div.className = "ride-card"; // Add a class for styling
        div.innerHTML = `
          <h4>From: ${ride.from}</h4>
          <h4>To: ${ride.to}</h4>
          <p><strong>Date & Time:</strong> ${new Date(ride.date).toLocaleString()}</p>
          <p><strong>Created By:</strong> ${ride.driverId}</p>
          <p><strong>Seats Available:</strong> ${ride.seatsAvailable}</p>
          <button class="join-btn" onclick="joinRide('${ride._id}', this)">Join Now</button>
        `;
        container.appendChild(div);
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching available rides: " + err.message);
    }
  }

// Join Ride Function
async function joinRide(rideId, button) {
  try {
    const res = await fetch(`http://localhost:5000/api/ride/join/${rideId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"), // Assuming userId is stored after login
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.msg || "Successfully joined the ride!");
      // Remove the ride from the list
      const rideCard = button.parentElement;
      rideCard.remove();
    } else {
      alert(data.error || "Failed to join the ride");
    }
  } catch (err) {
    console.error(err);
    alert("Error joining the ride: " + err.message);
  }
}

// Handle Create Ride Form Submission
document.getElementById("createRideForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const driverId = localStorage.getItem("userId"); // Assuming userId is stored after login
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("time").value;
    const seatsAvailable = document.getElementById("availableSeats").value;
    const price = document.getElementById("price").value;
  
    if (!driverId || !from || !to || !date || !seatsAvailable || !price) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/ride/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverId,
          from,
          to,
          date,
          seatsAvailable,
          price,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert(data.msg || "Ride created successfully!");
      } else {
        alert(data.error || "Failed to create ride");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating ride: " + err.message);
    }
  });
// Logout Function
function logout() {
  localStorage.removeItem("userId");
  alert("Logged out successfully!");
  window.location.href = "login.html"; // Redirect to login page
}