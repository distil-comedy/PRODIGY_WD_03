const turn = document.querySelector(".header__turn");
const gameBoxes = document.querySelectorAll(".game__box");
const btnReset = document.querySelector(".header__reset-btn");
const modal = document.querySelector(".modal");
const btnNew = document.querySelector(".modal__btn-new");
const btnNext = document.querySelector(".modal__btn-next");
const winnerType = document.querySelector(".modal__winner-type");
const winnerElement = document.querySelector(".modal__player-win");
const playerNumber = document.querySelector(".modal__playerNumber");
const xStat = document.querySelector(".game__stat-x");
const drawStat = document.querySelector(".game__stat-draw");
const oStat = document.querySelector(".game__stat-o");

let isTurnX = true;
let isDraw = false;
let count = 0;
let xCount = 0;
let oCount = 0;
let drawCount = 0;

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

gameBoxes.forEach((gameBox) => {
	gameBox.addEventListener("click", () => {
		if (isTurnX) {
			gameBox.innerText = "X";
			gameBox.style.color = "#08fead";
			turn.innerText = "O";
			isTurnX = false;
			count++;
		} else {
			gameBox.innerText = "O";
			gameBox.style.color = "#fd5600";
			turn.innerText = "X";
			isTurnX = true;
			count++;
		}

		gameBox.disabled = true;
		checkWinner();
	});
});

const checkWinner = () => {
	for (let pattern of winningConditions) {
		let pos1Val = gameBoxes[pattern[0]].innerText;
		let pos2Val = gameBoxes[pattern[1]].innerText;
		let pos3Val = gameBoxes[pattern[2]].innerText;

		if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
			if (pos1Val === pos2Val && pos2Val === pos3Val) {
				showWinner(pos1Val);
				return;
			}
		}
	}

	if (count === 9) {
		showDraw();
	}
};

const showWinner = (winner) => {
	modal.show();
	if (winner === "X") {
		playerNumber.innerText = "Player 1";
		xCount++;
		xStat.innerText = xCount;
	} else {
		playerNumber.innerText = "Player 2";
		oCount++;
		oStat.innerText = oCount;
	}
	winnerType.innerText = winner;
	disableBoxes();
};

const showDraw = () => {
	modal.show();
	playerNumber.innerText = "Draw";
	winnerType.innerText = "No-one";
	drawCount++;
	drawStat.innerText = drawCount;
	disableBoxes();
};

const reset = (all = false) => {
	gameBoxes.forEach((box) => (box.innerText = ""));
	enableBoxes();
	count = 0;
	isTurnX = true;
	turn.innerText = "X";
	if (all) {
		xCount = 0;
		drawCount = 0;
		oCount = 0;
		xStat.innerText = 0;
		drawStat.innerText = 0;
		oStat.innerText = 0;
	}
};

const disableBoxes = () => gameBoxes.forEach((box) => (box.disabled = true));
const enableBoxes = () => gameBoxes.forEach((box) => (box.disabled = false));

btnNew.addEventListener("click", () => {
	modal.close();
	reset(true);
});

btnNext.addEventListener("click", () => {
	modal.close();
	reset();
});

btnReset.addEventListener("click", () => {
	reset();
});
