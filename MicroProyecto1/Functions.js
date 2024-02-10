
function getPlayerNames() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const player3 = document.getElementById('player3').value;
    const player4 = document.getElementById('player4').value;

    if (player1 && player2) {
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        localStorage.setItem('player3', player3);
        localStorage.setItem('player4', player4);
        document.getElementById('start-form').submit();
        printPlayerNames();
    } else {
        alert('Por favor, ingrese al menos dos nombres de jugadores.');
    }
}


function getPlayerNamesFromSessionStorage() {
    const playerNames = sessionStorage.getItem('playerNames');
  
    if (playerNames) {
        return JSON.parse(playerNames);
    } else {
        alert('No se encontraron jugadores en sessionStorage.');
        return null;
    }
}


function startGame() {
    const playerNames = getPlayerNamesFromSessionStorage();
    const boardSize = document.querySelector('select').value;
  
    if (playerNames) {
        // Pasar los nombres de los jugadores y el tamaño del tablero al juego
        window.location.href = `Juego.html?playerNames=${playerNames.join(',')}&boardSize=${boardSize}`;
    } else {
        alert('No se pudo iniciar la partida.');
    }
}


function getGameParamsFromURL() {
    const playerNames = JSON.parse(sessionStorage.getItem('playerNames'));
    const boardSize = sessionStorage.getItem('boardSize');
  
    return { playerNames, boardSize };
}


function printPlayerNames(playerNames) {
    console.log('Jugadores:');
    playerNames.forEach((playerName, index) => {
        console.log(`${index + 1}. ${playerName}`);
    });
}


const { playerNames, boardSize } = getGameParamsFromURL();

if (playerNames) {
    printPlayerNames(playerNames);
} else {
    alert('No se pudo obtener la información de los jugadores.');
}
