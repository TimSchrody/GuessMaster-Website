//Anzahl anzuzeigender Spieler
var amt_playershow = document.getElementById("anzahl-spieler");
// Tabelle mit ID "scoreboard" in html suchen
var tablecontainer = document.getElementById("section3_table");
//andere stats
var total_players = document.getElementById("total_players");
var rounds_total = document.getElementById("rounds_total");
var points_total = document.getElementById("points_total");
var avg_rpg = document.getElementById("avg_rpg");
//andere benötigte Variablen
var responseJson = new Array;
var player_scores = new Array;
var players_total = 0;
var round_sum = 0;
var points_sum = 0;
var rpg_avg = 1;
  
/*---Starten der Seite----------------------------------------------------------------------------------------------*/

//Ausgangsfunktion beim Laden der Seite
loadData();
players();
rounds();
points();
rpg();
  
/*---EventListener--------------------------------------------------------------------------------------------------*/
  
  amt_playershow.addEventListener("change", () => {
    buildTable();
  });
  
/*---Funktionen-----------------------------------------------------------------------------------------------------*/

async function loadData(){
  let response = await fetch('/statsTable');
  responseJson = await response.json();
  playerscores();
};

async function players(){
  let response = await fetch('/playersTotal');
  responseJson = await response.json();
  players_total = responseJson[0].players_total;
  playerOutput();
};

async function rounds(){
  let response = await fetch('/roundSum');
  responseJson = await response.json();
  round_sum = responseJson[0].round_sum;
  roundOutput();
};

async function points(){
  let response = await fetch('/scoreSum');
  responseJson = await response.json();
  points_sum = responseJson[0].score_sum;
  pointOutput();
};

async function rpg(){
  let response = await fetch('/avgRPG');
  responseJson = await response.json();
  rpg_avg = responseJson[0].average_rounds_per_game;
  rpgOutput();
};

  function playerscores(){
    var i = 0;
    for (const row of responseJson) {
      player_scores[i] = [row.platzierung, row.user_id, row.spielername, row.punktzahl, row.gespielte_runden];
      i++;
    }
    buildTable();
  };

  function buildTable(){
    amt_show = amt_playershow.value;
  
    //Tabelle komlett leeren, ...
    tablecontainer.innerHTML = '';
  
    //...dann neu füllen
    // HTML-Tabelle erstellen
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
  
    //Header bzw. Überschriften der Zeilen festlegen
    let tableHeaders = ["worldwide ranking", "playername", "points", "rounds played"];
  
    // Tabellenkopf erstellen
    for (let i = 0; i < tableHeaders.length; i++) {
      const headerCell = document.createElement('th');
      headerCell.textContent = tableHeaders[i];
      tableHeadRow.appendChild(headerCell);
    }
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
  
    // Tabelleninhalt erstellen
    var tableBody = document.createElement('tbody');
    for (let i = 0; i < Math.min(player_scores.length, amt_show); i++) {
      var tableRow = document.createElement('tr');
  
      var tableCell = document.createElement('td');
      tableCell.textContent = player_scores[i][0];    //Platzierung
      tableRow.appendChild(tableCell);
  
      tableCell = document.createElement('td');
      tableCell.textContent = player_scores[i][2];    //Name
      tableRow.appendChild(tableCell);
  
      tableCell = document.createElement('td');
      tableCell.textContent = player_scores[i][3];    //Punktzahl
      tableRow.appendChild(tableCell);
  
      tableCell = document.createElement('td');
      tableCell.textContent = player_scores[i][4];    //Runden
      tableRow.appendChild(tableCell);
  
      tableBody.appendChild(tableRow);
    }
    table.appendChild(tableBody);
  
    //Tabelle in HTML einfügen
    tablecontainer.appendChild(table);
  };

  function playerOutput(){
    total_players.textContent = players_total;
  }

  function roundOutput(){
    rounds_total.textContent = round_sum;
  }

  function pointOutput(){
    points_total.textContent = points_sum;
  }

  function rpgOutput(){
    avg_rpg.textContent = parseInt(rpg_avg);
  } 

/*---Allgemeines----------------------------------------------------------------------------------------------------*/
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