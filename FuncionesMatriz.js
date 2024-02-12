const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,47,48,49,50];
let scores = [0,0,0,0]; 

document.addEventListener('DOMContentLoaded', () => {
    const playerNames = JSON.parse(localStorage.getItem('playerNamesArray'));

  
    if (playerNames) {
      printPlayerNames(playerNames);
      changeText(JSON.parse(localStorage.getItem("playerNamesArray"))[0]);
    }
  
    if (scores) {
      fillScoreTable(scores);
    }
  });


function createMatrix(n) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  }
  const matrix = createMatrix(3);
  
function llenarMatrizRandom(matrix) {
    const list = Array.from({ length: 50 }, (_, i) => i + 1);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
        const index = Math.floor(Math.random() * list.length);
        const value = list[index];

        list.splice(index, 1);

        if (i < matrix.length && j < matrix[i].length) {
            matrix[i][j] = value;
        }
        }
    }

    return matrix;
}
 
  
  const numPlayers = localStorage.getItem("numPlayers")
  const matrixSize = localStorage.getItem('boardSize');;
  const arr = createMatrix(matrixSize);
  
  llenarMatrizRandom(arr);

function createMatricesForPlayers(numPlayers, matrixSize) {
    const matrices = [];
  
    for (let i = 0; i < numPlayers; i++) {
      const matrix = createMatrix(matrixSize);
      llenarMatrizRandom(matrix);
      matrices.push(matrix);
    }
  
    return matrices;
  }

matrices = createMatricesForPlayers(numPlayers, matrixSize)


function updateTable(matrix) {
    const table = document.getElementById("tblBingo");
    table.innerHTML = "";
  
    for (let i = 0; i < matrix.length; i++) {
      let tr = document.createElement("tr");
      table.appendChild(tr);
  
      for (let j = 0; j < matrix[i].length; j++) {
        let td = document.createElement("td");
        td.id = matrix[i][j].toString();
        td.style.height = "20%";
        td.style.width = "20%";
        td.classList.add("main-table-cell");
  
        let div = document.createElement("div");
        div.classList.add("cell-format");
  
        if (matrix[i][j] === 0) {
          div.style.backgroundColor = "red";
        } else {
          div.textContent = matrix[i][j].toString();
        }
  
        td.appendChild(div);
        tr.appendChild(td);
      }
    }
  }


let currentMatrixIndex = 0;
const numMatrices = matrices.length;
updateTable(matrices[0])


function changeText(newText) {
    const textBox = document.getElementById('customTextBox');
    textBox.textContent = newText;
}

function changeMatrix(direction) {
  currentMatrixIndex += direction;
  if (currentMatrixIndex < 0) {
    currentMatrixIndex = numMatrices - 1;
  }
  if (currentMatrixIndex >= numMatrices) {
    currentMatrixIndex = 0;
  }
  updateTable(matrices[currentMatrixIndex]);
  changeText(JSON.parse(localStorage.getItem("playerNamesArray"))[currentMatrixIndex]);
}

const leftArrowButton = document.querySelector(".left-arrow");
leftArrowButton.addEventListener("click", () => {
  changeMatrix(-1);
});

const rightArrowButton = document.querySelector(".right-arrow");
rightArrowButton.addEventListener("click", () => {
  changeMatrix(1);
});




function findNumberInMatrices(number, matrixIndex = -1) {
    for (let i = 0; i < matrices.length; i++) {
      for (let j = 0; j < matrices[i].length; j++) {
        for (let k = 0; k < matrices[i][j].length; k++) {
          if (matrices[i][j][k] === number) {
            matrices[i][j][k] = 0;
            if (matrixIndex !== -1) {
              return matrixIndex;
            }
            return i;
          }
        }
      }
    }
    return -1;
  }
  

function checkAllMatrices() {
    for (let matrixIndex = 0; matrixIndex < matrices.length; matrixIndex++) {
        const matrix = matrices[matrixIndex];
        checkDiagonal(matrix, matrixIndex);
        checkBoard(matrix, matrixIndex);
        checkcolumns(matrix, matrixIndex);
        checkRows(matrix, matrixIndex) 
        
    }
}

const textBox = document.querySelector('.text-box .text');

function generateNumber() {
    if (numbers.length === 0) {
      console.log("No se pueden generar más números");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    
    console.log(number);
    
    const matrixIndex = findNumberInMatrices(number);
    if (matrixIndex !== -1) {
      updateTable(matrices[matrixIndex]);
      checkAllMatrices();
    }
    
    textBox.textContent = number.toString();
    numbers.splice(randomIndex, 1);
  }
  

rotateWheelButton.addEventListener('click', generateNumber);


function checkcolumns(matrix, matrixIndex) {
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      let isColumnComplete = true;
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        if (matrix[rowIndex][columnIndex] !== 0) {
          isColumnComplete = false;
          break;
        }
      }
      if (isColumnComplete) {
        updatePlayerScore(matrixIndex, 1); 
      }
    }
  }

function checkRows(matrix, matrixIndex) {
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      let isRowComplete = true;
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        if (matrix[rowIndex][columnIndex] !== 0) {
          isRowComplete = false;
          break;
        }
      }
      if (isRowComplete) {
        updatePlayerScore(matrixIndex, 1);
      }
    }
  }


function checkDiagonal(matrix, matrixIndex) {
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    let isDiagonalComplete = true;
    for (let i = 0; i < rows; i++) {
      if (matrix[i][i] !== 0) {
        isDiagonalComplete = false;
        break;
      }
    }
    if (isDiagonalComplete) {
      updatePlayerScore(matrixIndex, 3); 
    }
  

    isDiagonalComplete = true;
    for (let i = 0; i < rows; i++) {
      if (matrix[i][columns - i - 1] !== 0) {
        isDiagonalComplete = false;
        break;
      }
    }
    if (isDiagonalComplete) {
      updatePlayerScore(matrixIndex, 3); 
    }
  }


function checkBoard(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    for (let i = 0; i < rows; i++) {
      let rowMarked = matrix[i].every((value) => value === 0);
      if (!rowMarked) {
        return false;
      }
    }
  
    for (let j = 0; j < columns; j++) {
      let columnMarked = matrix.every((row) => row[j] === 0);
      if (!columnMarked) {
        return false;
      }
    }
  
    let diagonal1Marked = matrix.every((row, i) => row[i] === 0);
    if (!diagonal1Marked) {
      return false;
    }
  
    let diagonal2Marked = matrix.every((row, i) => row[columns - i - 1] === 0);
    if (!diagonal2Marked) {
      return false;
    }
  
    return true;
  }
  


function updatePlayerScore(playerIndex, newScore) {
    scores[playerIndex] += newScore;
    const numPlayers = localStorage.getItem("numPlayers");
    localStorage.setItem("playerScoresArray", JSON.stringify(scores.slice(0, numPlayers)));
    fillScoreTable(scores.slice(0, numPlayers));}



function findMaxScoreIndex(scores) {
    let maxValue = scores[0];
    let maxIndex = 0;
  
    for (let i = 1; i < scores.length; i++) {
      if (scores[i] > maxValue) {
        maxValue = scores[i];
        maxIndex = i;
      }
    }
  
    return maxIndex;
  }




