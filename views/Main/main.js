hamburger = document.querySelector("#hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}

function cursorBig(){
    document.querySelector(".cursor").classList.add("increase");
    document.querySelector(".cursor2").classList.add("increase");
}
function cursorSmall(){
    document.querySelector(".cursor").classList.remove("increase");
    document.querySelector(".cursor2").classList.remove("increase");
}


const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY+ "px";
});

const cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", (e) => {
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY+ "px";
});

const header = document.querySelector(".header");
window.addEventListener("scroll", function(){
    if(window.scrollY==0){
      //user is at the top of the page; no need to show the back to top button
        header.classList.remove("scroll")
    } else {
        header.classList.add("scroll")
    }
});


var responseJson = new Array;
var players_total = 0;
var round_sum = 0;
var score_sum = 0;

async function total_players(){
    
    let response = await fetch('/playersTotal');
    responseJson = await response.json();
    players_total = responseJson[0].players_total;
    document.getElementById("sec3_data3").innerHTML = players_total;
  };

  async function total_rounds(){
    
    let response = await fetch('/roundSum');
    responseJson = await response.json();
    round_sum = responseJson[0].round_sum;
    document.getElementById("sec3_data1").innerHTML = round_sum;
  };


  async function total_score(){
    let response = await fetch('/scoreSum');
    responseJson = await response.json();
    score_sum = responseJson[0].score_sum;
    document.getElementById("sec3_data2").innerHTML = score_sum;
  };


total_players();
total_rounds();
total_score();

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


/*
let valueDisplays = document.querySelectorAll(".sec3_data");
let interval = 4000;
valueDisplays.forEach((valueDisplay) => {
let startValue = 0;
let endValue = parseInt(players_total);
let duration = Math.floor(interval / endValue);
let counter = setInterval(function () {
startValue += 1;
valueDisplay.textContent = startValue;
if (startValue == endValue) {
clearInterval(counter);
}
}, duration);
});*/