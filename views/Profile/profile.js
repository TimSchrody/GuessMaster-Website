let matchHistoryIsShown = false;
let responseJson = [];
let responseUserName = "";

//Function thats executed when loading the page
async function LoadData(){
    let response = await fetch('/profileData');
    responseJson = await response.json();


    let UserName = await fetch('/profileName');
    responseUserName = await UserName.json();
    setProfileData(responseJson);
}

function setProfileData(profileData){

    let numberOfWins = 0;
    let numberOfGames = 0;
    let numberOfPoints = 0;
    let numberOfRounds = 0;
    let highscore = 0;
    let winrate = 0;
    let averagePoints = 0;

    profileData.forEach(matchData =>{
        numberOfGames++;
        numberOfPoints += matchData.score;
        numberOfRounds += matchData.rounds;

        if (matchData.ranking === 1){
            numberOfWins++;
        }
        if(highscore < matchData.score){
            highscore = matchData.score;
        }
    });

    if(numberOfGames !== 0){
        winrate = ((numberOfWins/numberOfGames)*100).toFixed(1);
        averagePoints = numberOfPoints/numberOfRounds;
    }

    setUsername();
    setWinCount(numberOfWins);
    setGameCount(numberOfGames);
    setPointCount(numberOfPoints);
    setRoundsPlayed(numberOfRounds);
    setHighscore(highscore);
    setWinrate(winrate);
    setAveragePoints(averagePoints);
}

function addMatch(mode, date, rounds, score, rank){

    let timeline = document.getElementById("timeline");
    let div = document.createElement("div");
    div.setAttribute("class", "timeline-element");
    let h2 = document.createElement("h2");
    h2.innerText = mode + " Game";
    let table = document.createElement("table");
    let row1 = document.createElement("tr");
    let row2 = document.createElement("tr");
    let cell1 = document.createElement("td");
    cell1.innerText = "Date: " + date;
    let cell2 = document.createElement("td");
    cell2.innerText = "Rounds: " + rounds.toString();
    let cell3 = document.createElement("td");
    cell3.innerText = "Score: " + score.toString();
    let cell4 = document.createElement("td");
    cell4.innerText = "Rank: " + rank.toString() + ".";

    row1.appendChild(cell1);
    row1.appendChild(cell2);
    row2.appendChild(cell3);
    row2.appendChild(cell4);
    table.appendChild(row1);
    table.appendChild(row2);
    div.appendChild(h2);
    div.appendChild(table);
    timeline.appendChild(div);
}

function setUsername(){
    let username1 = document.getElementById("username1");
    let username2 = document.getElementById("username2");
    username1.innerText = responseUserName;
    username2.innerText = responseUserName;
}

function setWinCount(numberOfWins){
    let numberOfWinsText = document.getElementById("numberOfWins");
    numberOfWinsText.innerText = "Wins: " + numberOfWins.toString();
}

function setGameCount(numberOfGames){
    let numberOfGamesText = document.getElementById("numberOfGames");
    numberOfGamesText.innerText = "Games: " + numberOfGames.toString();
}

function setPointCount(numberOfPoints){
    let numberOfPointsText = document.getElementById("numberOfPoints");
    numberOfPointsText.innerText = "Points: " + numberOfPoints.toString();
}

function setRoundsPlayed(numberOfRoundsPlayed){
    let numberOfRoundsPlayedText = document.getElementById("numberOfRoundsPlayed");
    numberOfRoundsPlayedText.innerText = numberOfRoundsPlayed.toString();
}

function setAveragePoints(averagePoints){
    let averagePointsText = document.getElementById("averagePoints");
    averagePointsText.innerText = averagePoints.toFixed(2).toString();
}


function setHighscore(highscore){
    let highscoreText = document.getElementById("highscore");
    highscoreText.innerText = highscore.toString();
}

function setWinrate(winrate){
    let winrateText = document.getElementById("winrate");
    winrateText.innerText = winrate.toString() + "%";
}
//--------------------------

function removeMatchHistoty(){
    document.querySelectorAll('.timeline-element').forEach(e => e.remove());
    document.querySelectorAll('.timeline-text').forEach(e => e.remove());
}

function addMatchHistoty(){
    let numberOfGames = 0;
    if(responseJson.length !== 0){
        responseJson.forEach(matchData =>{
            numberOfGames++;
            if(numberOfGames < 11){
                let date = convertDate(matchData.date);
                addMatch(matchData.mode,date,matchData.rounds,matchData.score,matchData.ranking);
            }
        });
    } else{
        let hr = document.getElementById("divider");
        let p = document.createElement("p");
        p.setAttribute("class", "timeline-text");
        p.innerText = "No Matches Played";
        hr.parentNode.insertBefore(p, hr.nextSibling);
    }
}

function convertDate(date){
    date = date.substring(8,10) + "." + date.substring(5,7) + "." + date.substring(0,4);
    return date;
}

function updateMatchHistory(){
    let matchHistoryButton = document.getElementById("MatchHistoryButton");

    if(!matchHistoryIsShown){
        matchHistoryButton.innerText = "Hide Match History";
        let hr = document.createElement("hr");
        hr.setAttribute("id", "divider");
        matchHistoryButton.parentNode.insertBefore(hr, matchHistoryButton.nextSibling);
        addMatchHistoty();   
        matchHistoryIsShown = true;
    } else{
        matchHistoryButton.innerText = "Show Match History";
        removeMatchHistoty();
        let hr = document.getElementById("divider");
        hr.parentNode.removeChild(hr);
        matchHistoryIsShown = false;
    }
}


////////////////////////////////////////////////////////////////////////
hamburger = document.querySelector("#hamburger");

hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
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