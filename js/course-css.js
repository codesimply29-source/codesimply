// ===========================
// Course CSS JavaScript
// ===========================

const video = document.getElementById("video");
const source = document.getElementById("videoSource");

const lessons = document.querySelectorAll(".lesson");

const lessonTitle = document.getElementById("lessonTitle");
const lessonDesc = document.getElementById("lessonDesc");

const progressBar = document.getElementById("progressBar");
const progressNum = document.getElementById("progressNum");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


// ===========================
// بيانات الدروس
// ===========================

const course = [

{
title:"مقدمة في CSS",
desc:"سنتعرف على CSS ولماذا نستخدمها وكيف تعمل مع HTML.",
video:"videos/css/lesson1.mp4"
},

{
title:"ربط CSS مع HTML",
desc:"تعلم جميع طرق ربط ملفات CSS بصفحة HTML.",
video:"videos/css/lesson2.mp4"
},

{
title:"CSS Syntax",
desc:"كتابة قواعد CSS بالشكل الصحيح.",
video:"videos/css/lesson3.mp4"
},

{
title:"Colors & Background",
desc:"تعلم الألوان والخلفيات باحتراف.",
video:"videos/css/lesson4.mp4"
},

{
title:"Fonts & Text",
desc:"تنسيق النصوص والخطوط.",
video:"videos/css/lesson5.mp4"
},

{
title:"Margin & Padding",
desc:"فهم المسافات الداخلية والخارجية.",
video:"videos/css/lesson6.mp4"
},

{
title:"Borders",
desc:"التعامل مع الحدود.",
video:"videos/css/lesson7.mp4"
},

{
title:"Box Model",
desc:"شرح صندوق العناصر.",
video:"videos/css/lesson8.mp4"
},

{
title:"Display",
desc:"شرح خصائص العرض.",
video:"videos/css/lesson9.mp4"
},

{
title:"Position",
desc:"شرح Position بالكامل.",
video:"videos/css/lesson10.mp4"
},

{
title:"Flexbox",
desc:"بناء Layout احترافي.",
video:"videos/css/lesson11.mp4"
},

{
title:"CSS Grid",
desc:"تعلم Grid Layout.",
video:"videos/css/lesson12.mp4"
},

{
title:"Width & Height",
desc:"التحكم في الأبعاد.",
video:"videos/css/lesson13.mp4"
},

{
title:"Responsive Design",
desc:"تصميم المواقع لكل الأجهزة.",
video:"videos/css/lesson14.mp4"
},

{
title:"Media Query",
desc:"شرح Media Query.",
video:"videos/css/lesson15.mp4"
},

{
title:"Animation",
desc:"إضافة الحركات للموقع.",
video:"videos/css/lesson16.mp4"
},

{
title:"Transition",
desc:"عمل انتقالات احترافية.",
video:"videos/css/lesson17.mp4"
},

{
title:"Transform",
desc:"تكبير وتصغير وتدوير العناصر.",
video:"videos/css/lesson18.mp4"
},

{
title:"مشروع عملي",
desc:"تطبيق كل ما تعلمته.",
video:"videos/css/lesson19.mp4"
},

{
title:"المراجعة النهائية",
desc:"مراجعة شاملة للكورس.",
video:"videos/css/lesson20.mp4"
}

];


// ===========================
// Local Storage
// ===========================

let currentLesson =
Number(localStorage.getItem("cssCurrentLesson")) || 0;


// ===========================
// تحميل الدرس
// ===========================

function loadLesson(index){

lessonTitle.innerText =
course[index].title;

lessonDesc.innerText =
course[index].desc;

source.src =
course[index].video;

video.load();

lessons.forEach((btn,i)=>{

btn.classList.remove("active");

if(i==index){

btn.classList.add("active");

}

if(i<index){

btn.classList.add("done");

}else{

btn.classList.remove("done");

}

});

let percent=((index)/course.length)*100;

progressBar.style.width=
percent+"%";

progressNum.innerText=
Math.round(percent)+"%";

localStorage.setItem(
"cssCurrentLesson",
index
);

}

loadLesson(currentLesson);


// ===========================
// الضغط على الدروس
// ===========================

lessons.forEach((lesson,index)=>{

lesson.onclick=function(){

currentLesson=index;

loadLesson(currentLesson);

video.play();

}

});


// ===========================
// التالي
// ===========================

nextBtn.onclick=function(){

if(currentLesson<course.length-1){

currentLesson++;

loadLesson(currentLesson);

video.play();

}

};


// ===========================
// السابق
// ===========================

prevBtn.onclick=function(){

if(currentLesson>0){

currentLesson--;

loadLesson(currentLesson);

video.play();

}

};


// ===========================
// نهاية الفيديو
// ===========================

video.onended=function(){

if(currentLesson<course.length-1){

currentLesson++;

loadLesson(currentLesson);

video.play();

}else{

progressBar.style.width="100%";

progressNum.innerText="100%";

alert("🎉 مبروك! لقد أنهيت كورس CSS بالكامل.");

}

};


// ===========================
// استكمال آخر درس
// ===========================

window.onload=function(){

loadLesson(currentLesson);

};
// =============================
// حفظ تقدم الطالب
// =============================



let completedLessons =
JSON.parse(localStorage.getItem("cssCompleted")) || [];

function updateLessons(){

lessons.forEach((lesson,index)=>{

if(completedLessons.includes(index)){

lesson.classList.add("done");

}

});

updateProgress();

}

function completeLesson(index){

if(!completedLessons.includes(index)){

completedLessons.push(index);

localStorage.setItem(

"cssCompleted",

JSON.stringify(completedLessons)

);

}

updateLessons();

}

function updateProgress(){

const percent=(completedLessons.length/lessons.length)*100;

document.querySelector(".progress-bar").style.width=percent+"%";

document.querySelector(".progress-text").innerText=

Math.round(percent)+"%";

}

updateLessons();
// =============================
// اختيار الدرس الحالي
// =============================

lessons.forEach((lesson,index)=>{

lesson.addEventListener("click",()=>{

document.querySelector(".lesson.active")?.classList.remove("active");

lesson.classList.add("active");

});

});
// =============================
// زر إنهاء الدرس
// =============================

const finishBtn=document.getElementById("finishLesson");

if(finishBtn){

finishBtn.onclick=function(){

const current=document.querySelector(".lesson.active");

if(current){

const index=[...lessons].indexOf(current);

completeLesson(index);

alert("🎉 تم إنهاء الدرس بنجاح");

}

};

}