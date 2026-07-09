const video = document.getElementById("videoPlayer");
const source = video.querySelector("source");

const lessons = document.querySelectorAll(".lesson");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const lessonTitle = document.getElementById("lessonTitle");

const nextBtn = document.getElementById("nextLesson");
const prevBtn = document.getElementById("prevLesson");

// آخر درس محفوظ
let currentLesson = Number(localStorage.getItem("currentLesson")) || 0;

// تحميل نسبة التقدم
let savedProgress = Number(localStorage.getItem("courseProgress")) || 0;

progressBar.style.width = savedProgress + "%";
progressText.innerText = Math.round(savedProgress) + "%";

// فتح آخر فيديو
if (lessons[currentLesson]) {

    source.src = lessons[currentLesson].dataset.video;
    video.load();

}

// تحديث شكل الصفحة
function updateButtons() {

    lessons.forEach((btn, index) => {

        btn.classList.remove("active");
        btn.classList.remove("done");

        if (index == currentLesson) {

            btn.classList.add("active");

        }

        if (index < currentLesson) {

            btn.classList.add("done");

            if (!btn.innerHTML.includes("✔")) {

                btn.innerHTML = "✔ " + btn.innerHTML;

            }

        }

    });

    lessonTitle.innerText =
    lessons[currentLesson].innerText.replace("✔","");

}

updateButtons();


// الضغط على أي درس

lessons.forEach((btn, index) => {

    btn.addEventListener("click", () => {

        currentLesson = index;

        source.src = btn.dataset.video;

        video.load();

        video.play();

        localStorage.setItem("currentLesson", currentLesson);

        updateButtons();

    });

});


// زر التالي

nextBtn.addEventListener("click", () => {

    if (currentLesson < lessons.length - 1) {

        lessons[currentLesson + 1].click();

    }

});


// زر السابق

prevBtn.addEventListener("click", () => {

    if (currentLesson > 0) {

        lessons[currentLesson - 1].click();

    }

});


// عند انتهاء الفيديو

video.addEventListener("ended", () => {

    let progress = ((currentLesson + 1) / lessons.length) * 100;

    progressBar.style.width = progress + "%";

    progressText.innerText = Math.round(progress) + "%";

    localStorage.setItem("courseProgress", progress);

    if (currentLesson < lessons.length - 1) {

        currentLesson++;

        localStorage.setItem("currentLesson", currentLesson);

        source.src = lessons[currentLesson].dataset.video;

        video.load();

        video.play();

        updateButtons();

    } else {

        progressBar.style.width = "100%";
        progressText.innerText = "100%";

        alert("🎉 مبروك، لقد أنهيت كورس HTML بالكامل.");

    }

});