const courses = [

{

title:"HTML & CSS",

price:"299 جنيه",

image:"images/html-course.jpg"

},

{

title:"JavaScript",

price:"499 جنيه",

image:"images/javascript-course.jpg"

},

{

title:"React",

price:"699 جنيه",

image:"images/react-course.jpg"

},

{

title:"Python",

price:"599 جنيه",

image:"images/python-course.jpg"

}

];

const grid=document.getElementById("coursesGrid");

function showCourses(){

grid.innerHTML="";

courses.forEach(course=>{

grid.innerHTML+=`

<div class="course-card">

<img src="${course.image}">

<h3>${course.title}</h3>

<h2>${course.price}</h2>

<button>عرض الكورس</button>

</div>

`;

});

}

showCourses();