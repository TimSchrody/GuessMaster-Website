hamburger = document.querySelector("#hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}

const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY+ "px";
})

const cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", (e) => {
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY+ "px";
})

const header = document.querySelector(".header");
window.addEventListener("scroll", function(){
    if(window.scrollY==0){
      //user is at the top of the page; no need to show the back to top button
        header.classList.remove("scroll")
    } else {
        header.classList.add("scroll")
    }
});
