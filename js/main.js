console.log("Welcome To Code Simply");

// ==========================
// Counter Animation
// ==========================
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  counters.forEach((counter) => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace("+", "");

      const speed = 80;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(update, 25);
      } else {
        counter.innerText = target + "+";
      }
    };

    update();
  });
}

// ==========================
// Dark Mode
// ==========================
const darkBtn = document.getElementById("darkMode");

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ==========================
// Mobile Menu
// ==========================
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

console.log("Home Page Loaded");