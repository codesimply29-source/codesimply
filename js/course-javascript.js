// ======================================
// عناصر الصفحة
// ======================================

const video = document.getElementById("courseVideo");
const source = video.querySelector("source");

const lessons = document.querySelectorAll(".lesson");

const lessonTitle = document.getElementById("lessonTitle");
const lessonDescription = document.getElementById("lessonDescription");

const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const finishBtn = document.getElementById("finishLesson");

// ======================================
// بيانات الدروس
// ======================================

const course = [

{
title:"مقدمة في JavaScript",
desc:"التعرف على لغة JavaScript واستخداماتها.",
video:"videos/javascript/lesson1.mp4"
},

{
title:"ربط JavaScript مع HTML",
desc:"تعلم كيفية ربط JavaScript بصفحات HTML.",
video:"videos/javascript/lesson2.mp4"
},

{
title:"المتغيرات Variables",
desc:"التعامل مع المتغيرات.",
video:"videos/javascript/lesson3.mp4"
},

{
title:"أنواع البيانات",
desc:"شرح جميع أنواع البيانات.",
video:"videos/javascript/lesson4.mp4"
},

{
title:"Operators",
desc:"العمليات الحسابية والمنطقية.",
video:"videos/javascript/lesson5.mp4"
},

{
title:"If Else",
desc:"الجمل الشرطية.",
video:"videos/javascript/lesson6.mp4"
},

{
title:"Switch",
desc:"شرح Switch Case.",
video:"videos/javascript/lesson7.mp4"
},

{
title:"Loops",
desc:"الحلقات التكرارية.",
video:"videos/javascript/lesson8.mp4"
},

{
title:"Functions",
desc:"شرح الدوال.",
video:"videos/javascript/lesson9.mp4"
},

{
title:"Arrays",
desc:"المصفوفات.",
video:"videos/javascript/lesson10.mp4"
},

{
title:"Objects",
desc:"الكائنات.",
video:"videos/javascript/lesson11.mp4"
},

{
title:"DOM",
desc:"التعامل مع عناصر الصفحة.",
video:"videos/javascript/lesson12.mp4"
},

{
title:"Events",
desc:"الأحداث.",
video:"videos/javascript/lesson13.mp4"
},

{
title:"DOM Manipulation",
desc:"تعديل عناصر الصفحة.",
video:"videos/javascript/lesson14.mp4"
},

{
title:"ES6",
desc:"مميزات JavaScript الحديثة.",
video:"videos/javascript/lesson15.mp4"
},

{
title:"Arrow Functions",
desc:"الدوال المختصرة.",
video:"videos/javascript/lesson16.mp4"
},

{
title:"Async Await",
desc:"البرمجة غير المتزامنة.",
video:"videos/javascript/lesson17.mp4"
},

{
title:"Fetch API",
desc:"جلب البيانات من السيرفر.",
video:"videos/javascript/lesson18.mp4"
},

{
title:"مشروع عملي",
desc:"تطبيق عملي كامل.",
video:"videos/javascript/lesson19.mp4"
},

{
title:"مراجعة الكورس",
desc:"مراجعة نهائية لكل ما تعلمناه.",
video:"videos/javascript/lesson20.mp4"
}

];

// ======================================
// Local Storage
// ======================================

let currentLesson =
Number(localStorage.getItem("jsCurrentLesson")) || 0;

let completedLessons =
JSON.parse(localStorage.getItem("jsCompletedLessons")) || [];
// ======================================
// تحميل الدرس
// ======================================

function loadLesson(index){

    lessonTitle.textContent = course[index].title;

    lessonDescription.textContent = course[index].desc;

    source.src = course[index].video;

    video.load();

    lessons.forEach((lesson,i)=>{

        lesson.classList.remove("active");

        if(completedLessons.includes(i)){

            lesson.classList.add("done");

        }else{

            lesson.classList.remove("done");

        }

        if(i===index){

            lesson.classList.add("active");

        }

    });

    const percent =
    (completedLessons.length/course.length)*100;

    progressBar.style.width = percent + "%";

    progressText.textContent =
    "نسبة الإنجاز " + Math.round(percent) + "%";

    if(completedLessons.includes(index)){

        finishBtn.innerHTML="✔ تم إنهاء الدرس";

        finishBtn.disabled=true;

    }else{

        finishBtn.innerHTML="✔ إنهاء الدرس";

        finishBtn.disabled=false;

    }

    localStorage.setItem(
        "jsCurrentLesson",
        index
    );

}

// ======================================
// اختيار أي درس
// ======================================

lessons.forEach((lesson,index)=>{

    lesson.addEventListener("click",()=>{

        currentLesson=index;

        loadLesson(currentLesson);

    });

});

// ======================================
// التالي
// ======================================

nextBtn.addEventListener("click",()=>{

    if(currentLesson<course.length-1){

        currentLesson++;

        loadLesson(currentLesson);

    }

});

// ======================================
// السابق
// ======================================

prevBtn.addEventListener("click",()=>{

    if(currentLesson>0){

        currentLesson--;

        loadLesson(currentLesson);

    }

});
// ======================================
// إنهاء الدرس
// ======================================

finishBtn.addEventListener("click",()=>{

    if(!completedLessons.includes(currentLesson)){

        completedLessons.push(currentLesson);

        completedLessons.sort((a,b)=>a-b);

        localStorage.setItem(
            "jsCompletedLessons",
            JSON.stringify(completedLessons)
        );

    }

    loadLesson(currentLesson);

    if(currentLesson < course.length-1){

        setTimeout(()=>{

            currentLesson++;

            loadLesson(currentLesson);

        },700);

    }else{

        setTimeout(()=>{

            alert("🎉 مبروك! لقد أنهيت كورس JavaScript بالكامل.");

        },700);

    }

});

// ======================================
// عند انتهاء الفيديو
// ======================================

video.addEventListener("ended",()=>{

    finishBtn.click();

});

// ======================================
// عند فتح الصفحة
// ======================================

window.addEventListener("load",()=>{

    loadLesson(currentLesson);

});

// ======================================
// منع تجاوز أول وآخر درس
// ======================================

function updateButtons(){

    prevBtn.disabled = currentLesson === 0;

    nextBtn.disabled = currentLesson === course.length - 1;

}

setInterval(updateButtons,100);

// ======================================
// اختصارات لوحة المفاتيح
// ======================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});

// ======================================
// حفظ وقت الفيديو (ميزة إضافية)
// ======================================

video.addEventListener("pause",()=>{

    localStorage.setItem(
        "jsVideoTime",
        video.currentTime
    );

});

video.addEventListener("loadedmetadata",()=>{

    const time = Number(
        localStorage.getItem("jsVideoTime")
    );

    if(time){

        video.currentTime = time;

    }

});