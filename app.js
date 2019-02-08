const overlay = document.getElementById('overlay');
const reset = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('ul');
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const buttons = document.getElementsByTagName('button');
const scoreboard = document.getElementById('scoreboard');

var score;
var missed = 0;
var resetGame = false;

const phrases = [
	'We are the Champions',
	'Wassup',
	'Another one bites the dust',
	'Is this the real life',
	'Elementary my dear Watson'
]



//Hides the Wheel of Success overlay to display game
function clearOverlay(display, cssClass){
	overlay.addEventListener('click', (e) => {
		overlay.style.display = display;
		overlay.classList.add(cssClass);
	})
}

if (reset.textContent === 'Start Game'){
	clearOverlay('none', 'start');
} else if (reset.textContent === 'Start a New Game') {
	clearOverlay('none', 'win');

} else if (reset.textContent === 'Try Again?') {
	clearOverlay('none', 'lose');
};

function getRandomPhraseAsArray(arr){
    //do stuff to any arr that is passed in
		const randomPhrases = Math.floor(Math.random() * arr.length);
		return arr[randomPhrases].split("");
}

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
	  for(var i = 0; i < arr.length; i += 1) {
	    let li = document.createElement('li');
			li.textContent = arr[i];
			if(arr[i] !== ' ') {
				li.className = 'letter';
			} else {
				li.className = 'space';
			}
			ul.appendChild(li);
	  }
	  return arr;
}

const phraseArray = getRandomPhraseAsArray(phrases);

addPhraseToDisplay(phraseArray);

function checkLetter(letterkeys) {
	let check = false;
	for (var i = 0; i < letters.length; i++) {
	    if (letterkeys.textContent === letters[i].textContent.toLowerCase()) {
	        letters[i].classList.add('show');
	        check = true;
	    }
	}
	return check;
}

function gamereset(){

	if (resetGame === true) {
		missed = 0;
		//reset phrase letters
		for (let i = 0; i < letters.length; i += 1) {
		    ul.removeChild(letters[i]);
		}
		//reset keyboard buttons
	 	for (var i = 0; i < buttons.length; i++) {
	 		buttons[i].className = "";
	 		buttons[i].disabled = false;
	 	}
		//reset hearts
	 	for (var i = 0; i < 5; i += 1) {
			let ol = scoreboard.getElementsByTagName('ol')[0];
			let li = scoreboard.querySelector('li:last-child');
			ol.addChild(li);
	 	}
		//reset phrase
		const phraseArray = getRandomPhraseAsArray(phrases);
		addPhraseToDisplay(phraseArray);
	}
	console.log(missed);
}

function checkwin(x, y, z){
	let check = false;
	if (x.length === y.length && z <= 5) {
		reset.innerHTML = 'Start a New Game';
		overlay.style.display = 'flex';
		overlay.classList.add('win');
		resetGame = true;
	}
	return check;
}

function checklose(){
	let check = false;
	if (missed > 5) {
		reset.innerHTML = 'Try Again?';
		overlay.style.display = 'flex';
		overlay.classList.add('lose');
		resetGame = true;
	}
	return check;
}

qwerty.addEventListener('click', (e) => {
	let letterFound = checkLetter(e.target);
	if (e.target.tagName === 'BUTTON'){
	    e.target.classList.add('chosen');
	    e.target.disabled = true;
	 if(letterFound) {
		checkwin(show, letters, missed);
	} else if (!letterFound){
		missed += 1;
		let ol = scoreboard.getElementsByTagName('ol')[0];
		let li = scoreboard.querySelector('li:last-child');
		if (missed <= 5) {
   			ol.removeChild(li);
		} else {
			checklose();
		}
	 }
  	}

});


gamereset();
