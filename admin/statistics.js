// ===============================
// Statistics
// ===============================

const totalUsers = document.getElementById("totalUsers");
const totalCourses = document.getElementById("totalCourses");
const totalRevenue = document.getElementById("totalRevenue");
const totalPayments = document.getElementById("totalPayments");

// ===============================
// Users
// ===============================

async function loadUsers() {

    try {

        const res = await fetch("http://localhost:5000/api/auth/count");

        const data = await res.json();

        totalUsers.textContent = data.totalUsers;

    } catch (err) {

        console.log(err);

    }

}

loadUsers();