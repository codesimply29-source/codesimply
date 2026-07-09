const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.innerHTML = "جاري تسجيل الدخول...";

    try {

        const res = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        if (res.ok) {

            message.style.color = "green";
            message.innerHTML = data.message;

            // حفظ بيانات المستخدم كاملة
            localStorage.setItem("user", JSON.stringify({
                _id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                purchasedCourses: data.user.purchasedCourses || []
            }));
            console.log(data.user);

            window.location.href = "/client/profile.html";

        } else {

            message.style.color = "red";
            message.innerHTML = data.message;

        }

    } catch (err) {

        console.log(err);

        message.style.color = "red";
        message.innerHTML = "حدث خطأ في الاتصال بالسيرفر";

    }

});