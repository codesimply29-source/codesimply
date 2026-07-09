const form = document.getElementById("courseForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value.trim());
    formData.append("description", document.getElementById("description").value.trim());
    formData.append("price", document.getElementById("price").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("level", document.getElementById("level").value);
    formData.append("language", document.getElementById("language").value);
    formData.append("duration", document.getElementById("duration").value);
    formData.append("lessonsCount", document.getElementById("lessonsCount").value);

    const imageInput = document.getElementById("image");
    const introVideoInput = document.getElementById("introVideo");

    if (imageInput && imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    if (introVideoInput && introVideoInput.files.length > 0) {
        formData.append("introVideo", introVideoInput.files[0]);
    }

    try {
        const res = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            alert("✅ تم إضافة الكورس بنجاح");
            form.reset();
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("❌ حدث خطأ في الاتصال بالسيرفر");
    }
});