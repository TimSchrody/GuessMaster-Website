


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

function setUsername(name){
    let username1 = document.getElementById("username1");
    let username2 = document.getElementById("username2");
    username1.innerText = name;
    username2.innerText = name;
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
}

function addMatchHistoty(){
    //unfinished

    // if there are no matches :display text

    addMatch("Normal","23.04.2023",7,480,1);
    addMatch("Normal","22.04.2023",4,280,3);
    addMatch("Normal","21.04.2023",5,480,1);
    addMatch("Normal","21.04.2023",5,380,2);
    addMatch("Normal","21.03.2023",6,580,1);
}




//test
setUsername("TheValdez123");
setWinCount(5);
setGameCount(10);
setPointCount(453);
setRoundsPlayed(55);
setAveragePoints(453/55);
setHighscore(456);
setWinrate(50);

removeMatchHistoty();
addMatchHistoty();

