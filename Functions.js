function getPlayerNames() {
    const playerInputs = ['player1', 'player2', 'player3', 'player4'];
    const playerNames = [];
    let numPlayers = 0;

    playerInputs.forEach(id => {
      const input = document.getElementById(id);
      if (input.value) {
        if (playerNames.includes(input.value)) {
          alert('Por favor, ingrese nombres de jugadores únicos.');
          input.value = '';
          input.focus();
          return;
        }
        playerNames.push(input.value);
        numPlayers++;
      }
    });
  
    if (numPlayers >= 2) {
      localStorage.setItem('playerNamesArray', JSON.stringify(playerNames));
      localStorage.setItem('boardSize', document.getElementById('boardSizeSelect').value);
      localStorage.setItem('numPlayers', numPlayers);
      document.getElementById('start-form').submit();
      printPlayerNames(playerNames);
      document.querySelector('table tbody').innerHTML = printPlayerNames();
    } else {
      alert('Por favor, ingrese al menos dos nombres de jugadores.');
    }
  
    return playerNames;}


function createZeroArray(numPlayers) {
    return Array.from({ length: numPlayers }, () => 0);}


function printPlayerNames(playerNames) {
    let playerNamesHtml = '<tr><th>Nombre</th><th>Puntaje</th></tr>';
    playerNames.forEach((playerName, index) => {
        playerNamesHtml += `<tr><td>${index + 1}. ${playerName}</td><td>0</td></tr>`;
    });
    document.querySelector('table tbody').innerHTML = playerNamesHtml;
}

function getNumPlayersFromLocalStorage() {
    const playerNamesArray = JSON.parse(localStorage.getItem('playerNamesArray'));
    return playerNamesArray ? playerNamesArray.length : 0;
}

function printPlayerNames() {
    const playerNames = JSON.parse(localStorage.getItem('playerNames'));
    const roundNumberDiv = document.querySelector('.round-number');
    let currentRoundNumber = parseInt(roundNumberDiv.textContent);
    roundNumberDiv.textContent = currentRoundNumber + 1;
    console.log('Jugadores:');
    playerNames.forEach((playerName, index) => {
        console.log(`${index + 1}. ${playerName}`);
    });
}

function startGame() {
    const { playerNames, boardSize } = getGameParamsFromURL();
    if (playerNames) {  
        window.location.href = `Juego.html?playerNames=${playerNames.join(',')}&boardSize=${boardSize}`;
        localStorage.setItem('playerScores', scores);
    } else {
        alert('No se pudo iniciar la partida.');
    }
}

function getGameParamsFromURL() {
    const playerNames = JSON.parse(localStorage.getItem('playerNames'));
    const boardSize = localStorage.getItem('boardSize');
    return { playerNames, boardSize };
}

const rotateWheelButton = document.querySelector('.rotate-wheel-button');
rotateWheelButton.addEventListener('click', () => {
const roundNumberDiv = document.querySelector('.round-number');
let currentRoundNumber = parseInt(roundNumberDiv.textContent);

if (currentRoundNumber === 25) {
    const maxScore = Math.max(...scores);
    const isTie = scores.every(score => score === maxScore);
if (isTie) {
    alert('Final de partida! No hay ganadores.');
    } else {
      const maxScoreIndex = scores.indexOf(maxScore);
      alert(`Final de partida! El ganador es: ${JSON.parse(localStorage.getItem("playerNamesArray"))[maxScoreIndex]}`);
      addWinner(JSON.parse(localStorage.getItem("playerNamesArray"))[maxScoreIndex]);
    }   
    window.location.href = "index.html";
    updateLeaderboard();
    return;
  }
  roundNumberDiv.textContent = currentRoundNumber + 1;
});

let scoreTableRows;

function fillScoreTable(playerScores) {
  const tbody = document.querySelector('#score-table tbody');
  tbody.innerHTML = '';
  const headerRow = document.createElement('tr');
  const scoreHeaderCell = document.createElement('th');
  scoreHeaderCell.textContent = 'Puntaje';
  headerRow.appendChild(scoreHeaderCell);
  tbody.appendChild(headerRow);

  scoreTableRows = [];

  for (let i = 0; i < playerScores.length; i++) {
    const row = document.createElement('tr');

    const playerCell = document.createElement('td');
    playerCell.textContent = JSON.parse(localStorage.getItem('playerNamesArray'))[i];
    row.appendChild(playerCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = playerScores[i];
    row.appendChild(scoreCell);

    tbody.appendChild(row);
    scoreTableRows.push(row);
  }
}

function addWinner(name) {
    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    let existingWinner = winners.find(winner => winner.name === name);
  
    if (existingWinner) {
      existingWinner.victories++;
    } else {
      winners.push({ name, victories: 1 });
    }
    localStorage.setItem('winners', JSON.stringify(winners));
  }


function updateLeaderboard() {
    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    winners.sort((a, b) => b.victories - a.victories);
    let tbody = document.querySelector('.leaderboard table tbody');
    tbody.innerHTML = '';
    winners.slice(0, 10).forEach(winner => {
        let row = tbody.insertRow();
        let nameCell = row.insertCell();
        nameCell.textContent = winner.name;
        let victoriesCell = row.insertCell();
        victoriesCell.textContent = winner.victories;
    });
}

function clearWinners() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los ganadores?')) {
      localStorage.removeItem('winners');
      let tbody = document.querySelector('.leaderboard table tbody');
      tbody.innerHTML = '';
      updateLeaderboard([]);
    }
  }
  
const clearWinnersButton = document.getElementById('clear-winners-button');
clearWinnersButton.addEventListener('click', clearWinners);


function showWinnersAlert() {
    const winners = JSON.parse(localStorage.getItem('winners')) || [];
    if (winners.length === 0) {
      alert('No hay ganadores.');
      return;
    }
  
    let winnersMessage = 'Ganadores:\n';
    updateLeaderboard();
    winners.forEach((winner, index) => {
      winnersMessage += `${index + 1}. ${winner.name} con ${winner.victories} victoria(s).\n`;
    });
  
    alert(winnersMessage);
  }



document.addEventListener('DOMContentLoaded', () => {
    const playerNames = getPlayerNames();
    printPlayerNames(playerNames);
    

    
});

function updateScoreTable() {
    const playerScores = JSON.parse(localStorage.getItem('playerScores'));
    fillScoreTable(playerScores);
  }
  
function addScore(playerIndex, score) {
    const playerScores = JSON.parse(localStorage.getItem('playerScores')) || [];
    playerScores[playerIndex] += score;
    localStorage.setItem('playerScores', JSON.stringify(playerScores));
    updateScoreTable();}


