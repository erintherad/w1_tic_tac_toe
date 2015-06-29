window.addEventListener("DOMContentLoaded", function() {

	// Find the box element in the html
	var boxes = document.getElementsByClassName("box");

	// Scoreboard begins at 0.
	var catWins = 0;
	var dogeWins =0;

	// Game begins with CAT
	var playerTurn = "CAT";

	// Function to create message to let players know who goes first
	var setGameStatus = function() {
		var p = document.getElementById("message");
		p.innerText = playerTurn + " TURN NOW!";
	};

	// Call at beginning of game.
	setGameStatus();

	// Function that allows scoreboard to update after every game.
	var updateScoreBoard = function() {
		var p = document.getElementById("scoreboard");
		p.innerHTML = "CAT SCORE: " + catWins + "<br>" + "DOGE SCORE: " + dogeWins;
	};

	// Call at beginning of game.
	updateScoreBoard();

	// Function that switches turns between cat and dog.
	var switchTurn = function() {
		if(playerTurn == "CAT") {
			playerTurn = "DOGE";
		} else {
			playerTurn = "CAT";
		}
		setGameStatus();
	};

	// Defines the gameboard and spaces.  Fills the default game with nothing text.
	var getBoard = function() {
		var board = [];
		for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			board[i] = box.innerText;
		}
		return board;
	};

	// Function to reset the gameboard after every game.
	var resetGame = document.getElementById("reset");
	resetGame.addEventListener("click", function() {
		for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			box.innerText = "";
			box.className = "col-xs-4 box";
		};
	});

	// Function that creates an event (click) to play the game. 
	// Places cat or dog on game board, enables playerTurn, switchTurn, and winnerWinnerChickenDinner.
	var onPlayerClick = function(event) {
		var box = event.target;
		if(winnerWinnerChickenDinner()) {
			return;
		}
		box.className += " " + playerTurn;
		box.innerText = playerTurn;
		switchTurn();
		winnerWinnerChickenDinner();
	};

	// A loop that iterates through all the boxes on the game board and enables the click event.
	for(var i = 0; i < boxes.length; i++) {
		var box = boxes[i];
		box.addEventListener("click", onPlayerClick);
	};

	// A function that finds row winners.
	var rowWinner = function(board) {
		var x = 0;
		var y = 1;
		var z = 2;

		for(var i = 0; i < 3; i++) {
			var rowCol1 = board[x];
			var rowCol2 = board[y];
			var rowCol3 = board[z];

			if((rowCol1 == rowCol2) && (rowCol2 == rowCol3) && (rowCol1 != "")) {
				return rowCol1;	
			} else {
				x += 3;
				y += 3;
				z += 3;
			}
		}
		return false;
	};

	// A function that finds column winners.
	var colWinner = function(board) {
		var x = 0;
		var y = 3;
		var z = 6;

		for (var i = 0; i < 3; i++) {
			var colRow1 = board[x];
			var colRow2 = board[y];
			var colRow3 = board[z];

			if((colRow1 == colRow2) && (colRow2 == colRow3) && (colRow1 != "")) {
				return colRow1;
			} else {
				x += 1;
				y += 1;
				z += 1;
			}
		}
		return false;
	};

	// A function that finds diagonal winners.
	var diagWinner = function(board) {
		var x = 0;
		var y = 4;
		var z = 8;

		var topLeftDiag = board[0];
		var middleDiag = board[4];
		var bottomRightDiag = board[8];
		var topRightDiag = board[2];
		var bottomLeftDiag = board[6];

		if((topLeftDiag == middleDiag) && (middleDiag == bottomRightDiag) && (topLeftDiag != "") || 
			(topRightDiag == middleDiag) && (middleDiag == bottomLeftDiag) && topRightDiag != "") {
			return middleDiag;
		}
		return false;
	};

	// A function that defines a draw on a full board.
	var checkEndGame = function(board) {

		var possibleDraw = true;

		for(var i = 0; i < board.length; i++) {
			var box = board[i];
			possibleDraw = (box != "");
			if(possibleDraw == false) {
				break;
			}
		}
		return possibleDraw;
	};

	// A function that creates an alert for a specific winner or draw.
	var winnerWinnerChickenDinner = function() {
		var board = getBoard();
		var won = rowWinner(board) || colWinner(board) || diagWinner(board);
		if(won) {
			alert(won + " IS THE WINNER!");
			if(won == "CAT") {
				catWins++;
			} else if(won == "DOGE") {
				dogeWins++;
			}
			updateScoreBoard();
			return true;
		} else if(checkEndGame(board)) {
			alert("IT'S A DRAW!");
			return true;
		}
	};

});


