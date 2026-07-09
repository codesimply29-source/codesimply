const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    console.log("المستخدم غير مسجل دخول");
} else {

    loadPurchasedCourses();

}

async function loadPurchasedCourses() {

    try {

        const res = await fetch(
            `http://localhost:5000/api/courses/my/${user._id}`
        );

        const data = await res.json();

        if (!data.success) return;

        data.purchasedCourses.forEach(course => {

            const btn = document.getElementById("btn-" + course.title);

            if (btn) {

                btn.innerHTML = "🚀 ابدأ الآن";

                btn.href = "/client/" + btn.dataset.redirect;

                btn.style.background = "#28a745";

                btn.style.color = "#fff";

            }

        });

    } catch (err) {

        console.log(err);

    }

}