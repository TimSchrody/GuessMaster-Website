hamburger = document.querySelector("#hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}

function cursorBig(){
    document.querySelector(".cursor").classList.toggle("increase");
}
function cursorSmall(){
    document.querySelector(".cursor").classList.toggle("increase");
}


const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY+ "px";
})


//TYPE WRITER
class TypeWriter {
constructor(txtElement, words, wait = 3000) {
this.txtElement = txtElement;
this.words = words;
this.txt = '';
this.wordIndex = 0;
this.wait = parseInt(wait, 10);
this.type();
this.isDeleting = false;
}

type() {
// Current index of word
const current = this.wordIndex % this.words.length;
// Get full text of current word
const fullTxt = this.words[current];

// Check if deleting
if (this.isDeleting) {
// Remove char
this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
// Add char
this.txt = fullTxt.substring(0, this.txt.length + 1);
}

// Insert txt into element
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

// Initial Type Speed
let typeSpeed = 80;

if (this.isDeleting) {
typeSpeed /= 2;
}

// If word is complete
if (!this.isDeleting && this.txt === fullTxt) {
// Make pause at end
typeSpeed = this.wait;
// Set delete to true
this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
this.isDeleting = false;
// Move to next word
this.wordIndex++;
// Pause before start typing
typeSpeed = 500;
}

setTimeout(() => this.type(), typeSpeed);
}
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
const txtElement = document.querySelector('.txt-type');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const wait = txtElement.getAttribute('data-wait');
// Init TypeWriter
new TypeWriter(txtElement, words, wait);
}



let valueDisplays = document.querySelectorAll(".sec3_data");
let interval = 4000;
valueDisplays.forEach((valueDisplay) => {
let startValue = 0;
let endValue = parseInt(valueDisplay.getAttribute("data-val"));
let duration = Math.floor(interval / endValue);
let counter = setInterval(function () {
startValue += 1;
valueDisplay.textContent = startValue;
if (startValue == endValue) {
clearInterval(counter);
}
}, duration);
});