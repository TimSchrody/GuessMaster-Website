/*let responseJson = new [];

async function LoadData(){
  let response = await fetch('/stats_table');
  responseJson = await response.json();
  console.log(responseJson);
  setProfileData(responseJson);
}*/

const player_scores = [
    [1, 1, 'DeezNuts', '11940', '107'],
    [2, 3, 'DickS.Ding', '10780', '118'],
    [3, 2, 'AnnaNass', '10760', '115'],
    [4, 5, 'KaiSer', '9755', '99'],
    [5, 4, 'JackDanielS', '8920', '104'],
    [6, 11, 'BernhardDiener', '8470', '89'],
    [7, 8, 'OlgaMachslochoff', '7235', '76'],
    [8, 7, 'ReinerZufall', '7230', '64'],
    [9, 10, 'HeideWitzka', '7115', '72'],
    [10, 6, 'GeorgAsmus', '6490', '74'],
    [11, 9, 'JoeKer', '6225', '67'],
    [12, 12, 'PearlHuber', '5945', '58'],
    [13, 13, 'MaxMustermann', '5855', '60'],
    [14, 14, 'SabineMusterfrau', '5825', '50'],
    [15, 15, 'PeterParker', '5805', '55'],
    [16, 36, 'HannahMontana', '5720', '62'],
    [17, 16, 'BruceWayne', '5585', '61'],
    [18, 19, 'WalterWhite', '5430', '75'],
    [19, 18, 'JessePinkman', '5385', '70'],
    [20, 21, 'WinniePooh', '5205', '80'],
    [21, 20, 'MickeyMouse', '5190', '61'],
    [22, 23, 'DonaldDuck', '5055', '51'],
    [23, 22, 'DaisyDuck', '5030', '28'],
    [24, 25, 'BugsBunny', '4960', '57'],
    [25, 24, 'DaffyDuck', '4915', '52'],
    [26, 27, 'RoadRunner', '4805', '53'],
    [27, 26, 'WileE.Coyote', '4755', '52'],
    [28, 29, 'ScoobyDoo', '4655', '48'],
    [29, 28, 'ShaggyRogers', '4610', '37'],
    [30, 31, 'BartSimpson', '4510', '1337'],
    [31, 30, 'HomerSimpson', '4485', '50'],
    [32, 33, 'MargeSimpson', '4380', '49'],
    [33, 32, 'LisaSimpson', '4355', '38'],
    [34, 37, 'PatrickStar', '4270', '42'],
    [35, 34, 'SpongeBobSquarePants', '4240', '45'],
    [36, 35, 'SonicTheHedgehog', '4200', '42'],
    [37, 17, 'Dr.Eggman', '4120', '47'],
    [38, 40, 'BugsBunny_2nd', '3995', '43'],
    [39, 38, 'HarrySchotter', '3870', '39'],
    [40, 39, 'Mjölnir', '3835', '29']
  ];
  
/*------------------------------------------------------------------------------------------------------------------*/
  
  //Anzahl anzuzeigender Spieler
  var amt_playershow = document.getElementById("anzahl-spieler");
  // Tabelle mit ID "scoreboard" in html suchen
  var tablecontainer = document.getElementById("section3_table");
  //andere stats
  var total_players = document.getElementById("total_players");
  var rounds_total = document.getElementById("rounds_total");
  var points_total = document.getElementById("points_total");
  var avg_ppr = document.getElementById("avg_ppr");
  
/*------------------------------------------------------------------------------------------------------------------*/
  
  amt_playershow.addEventListener("change", () => {
    buildTable();
  });
  
/*------------------------------------------------------------------------------------------------------------------*/

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

/*------------------------------------------------------------------------------------------------------------------*/
  
  buildTable();

  player_id_max = 0;
  for (let index = 0; index < player_scores.length; index++) {
    player_id_max = Math.max(player_scores[index][1], player_id_max);  
  }
  total_players.textContent = player_id_max;
  
  rounds_sum = 0;
  for(let index = 0; index < player_scores.length; index++){
    rounds_sum = rounds_sum + parseInt(player_scores[index][4]);
  }
  rounds_total.textContent = rounds_sum;
  
  points_sum = 0;
  for(let index = 0; index < player_scores.length; index++){
    points_sum = points_sum + parseInt(player_scores[index][3]);
  }
  points_total.textContent = points_sum;
  
  ppr = (points_sum/rounds_sum).toFixed(0);
  avg_ppr.textContent = ppr;

/*------------------------------------------------------------------------------------------------------------------*/
hamburger = document.querySelector("#hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}

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

const header = document.querySelector(".header");
window.addEventListener("scroll", function(){
    if(window.scrollY==0){
      //user is at the top of the page; no need to show the back to top button
        header.classList.remove("scroll")
    } else {
        header.classList.add("scroll")
    }
});