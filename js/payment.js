const form = document.getElementById("paymentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    console.log(user._id);

    if (!user) {
        alert("يجب تسجيل الدخول أولاً");
        window.location.href = "/client/login.html";
        return;
    }

    const params = new URLSearchParams(window.location.search);

    const courseName = params.get("course");
    const amount = params.get("price");
    const redirect = params.get("redirect");

    const screenshot = document.getElementById("screenshot").files[0];

    if (!screenshot) {
        alert("من فضلك اختر Screenshot لإثبات الدفع");
        return;
    }

    const formData = new FormData();

    formData.append("userId", user._id);
    formData.append("userName", user.name);
    formData.append("userEmail", user.email);
    formData.append("courseName", courseName);
    formData.append("amount", amount);
    formData.append("redirect", redirect);
    formData.append("screenshot", screenshot);

    try {

        const res = await fetch("http://localhost:5000/api/payments", {

            method: "POST",

            body: formData

        });

        const data = await res.json();

        if (res.ok) {

            alert("✅ تم إرسال طلب الدفع بنجاح.\nسيتم مراجعة الدفع ثم فتح الكورس لك.");

            window.location.href = "/client/courses.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

        alert("❌ حدث خطأ في الاتصال بالسيرفر");

    }

});