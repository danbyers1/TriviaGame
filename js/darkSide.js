$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start-button' href='#' role='button'>Let's Begin</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML 

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Times up! Perhaps a bounty hunter can find you. The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='images/bobafett.png' height='250' width'200' >";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='images/Darthvader2.png' height='250' width'200'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Impressive, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Try again</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who executed order 66?", "Which species stole the Death Star plans?", "What does AT-AT stand for?", "Who was the original commander of the Death Star?", "What creature captures Luke on Hoth?", "What does the acronym in TIE fighter stand for?", "Which Captain receives a battlefield promotion to Admiral when Vader Force-chokes his boss before the Battle of Hoth?", "What space port did the Millennium Falcon take off from?"];
var answerArray = [["Jar Jar Binks", "Darth Vader", "Emperor Palapatine", "Anakin Skywalker"], ["Humans","Bothans","Wookies","Hutts"], ["AT-AT", "At The Airport Terminal", "All Terrain Armored Transport", "A Terrible Animal Thing"], ["Orson Krennic","Darth Vader","Grand Moff Tarkin","Emperor Palpatine"], ["Bantha", "Tauntaun", "Jawa", "Wampa"], ["Twin Ion Engine","The Imperial Engine","Total Imperial Evil","This Imperial Enigma"], ["Rieekan", "Piett", "Ozzel", "Veers"], ["Platform 492","Port 73","Tarmac 21","Docking Bay 94"]];
var imageArray = ["<img class='center-block img-right' src='images/EmporerP.png' height='300' width='250'>", "<img class='center-block img-right' src='images/probeDroid.png' height='300' width='225'>", "<img class='center-block img-right' src='images/ATATWalker.png' height='300' width='297'>", "<img class='center-block img-right' src='images/Tarkin.png' height='300' width='250'>", "<img class='center-block img-right' src='images/wampa.png' height='300' width='250'>", "<img class='center-block img-right' src='images/TieFighter.png' height='300' width='297'>", "<img class='center-block img-right' src='images/piett.png' height='300' width='250' >", "<img class='center-block img-right' src='images/stormtrooper1.png' height='270' width='150'>"];
var correctAnswers = ["C. Emperor Palapatine", "B. Bothans", "C. All Terrain Armored Transport", "C. Grand Moff Tarkin", "D. Wampa", "A. Twin Ion Engine", "B. Piett", "D. Docking Bay 94"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("images/blaster.mp3");
