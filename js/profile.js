console.log("profile.js loaded");

// جلب بيانات المستخدم
const user = JSON.parse(localStorage.getItem("user"));

// لو المستخدم مش مسجل دخول
if (!user) {
    window.location.href = "/client/login.html";
}

// عرض الاسم إذا العنصر موجود
const nameElement = document.getElementById("name");
if (nameElement) {
    nameElement.innerText = user.name || "";
}

// عرض الإيميل إذا العنصر موجود
const emailElement = document.getElementById("email");
if (emailElement) {
    emailElement.innerText = user.email || "";
}

// زر تسجيل الخروج
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/client/login.html";
    });
}

// زر الصفحة الرئيسية
function goHome() {
    window.location.href = "/index.html";
}