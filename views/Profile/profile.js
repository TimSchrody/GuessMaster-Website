

//Function thats executed when loading the page
function LoadData(){

    let username = document.getElementById("username1").innerHTML;

    console.log(username);

}


function ShowMatchHistory(){
    //to be added
    console.log("Test History");
}


////////////////////////////////////////////////////////////////////////

function cursorBig(){
    document.querySelector(".cursor").classList.toggle("increase");
    document.querySelector(".cursor2").classList.toggle("increase");
}
function cursorSmall(){
    document.querySelector(".cursor").classList.toggle("increase");
    document.querySelector(".cursor2").classList.toggle("increase");
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