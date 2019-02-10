const overlay = document.getElementById('overlay');
const reset = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.getElementsByTagName('ul')[0];
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const buttons = document.getElementsByTagName('button');
const scoreboard = document.getElementById('scoreboard');

var score;
var missed = 0;
var resetGame = false;

const phrases = [
	'We are the Champions',
	'Crazy little thing called love',
	'Another one bites the dust',
	'Is this the real life',
	'All we hear is radio gaga'
]


//Hides the Wheel of Success overlay to display game
function clearOverlay(display, cssClass){
	overlay.addEventListener('click', (e) => {
		overlay.style.display = display;
		overlay.classList.add(cssClass);
		if (resetGame === true) {
			gamereset();
		}
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
		var randomPhrases = Math.floor(Math.random() * arr.length);
		return arr[randomPhrases].split("");
}

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
	  for(var i = 0; i < arr.length; i++) {
	    let li = document.createElement('li');
			li.textContent = arr[i];
			ul.appendChild(li);
			if(arr[i] !== ' ') {
				li.className = 'letter';
			} else {
				li.className = 'space';
			}
	  }
	  //return arr;
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
	missed = 0;
	overlay.classList.remove('win', 'lose');
	//reset phrase tiles
	const ulli = document.querySelectorAll('.letter, .space');
	for (var i = 0; i < ulli.length; i += 1) {
    	ul.removeChild(ulli[i]);
    }
	//reset keyboard buttons
 	for (var i = 0; i < buttons.length; i++) {
 		buttons[i].className = "";
 		buttons[i].disabled = false;
 	}
	//reset hearts
	const olli = document.querySelectorAll('.tries');
	for (var i = 0; i < olli.length; i += 1) {
		olli[i].style.display = "inline-block";
	}

	//reset phrase
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
}

function checkwin(x, y, z){
	if (x.length === y.length && z <= 5) {
		title.innerHTML = 'YOU WON!';
		reset.innerHTML = 'Start a New Game!';
		overlay.style.display = 'flex';
		overlay.classList.add('win');
		resetGame = true;
	}
}

function checklose(){
	missed+=1;
	const ol = scoreboard.firstElementChild;
	let li = ol.children[missed-1];
	if (missed <= 5) {
		li.style.display = "none";
	}

	if (missed >= 5) {
		title.innerHTML = 'YOU LOSE';
		reset.innerHTML = 'Try Again?';
		overlay.style.display = 'flex';
		overlay.classList.add('lose');
		resetGame = true;
	}
}

qwerty.addEventListener('click', (e) => {
	let letterFound = checkLetter(e.target);
	if (e.target.tagName === 'BUTTON'){
	    e.target.classList.add('chosen');
	    e.target.disabled = true;
	 	if(letterFound) {
			checkwin(show, letters, missed);
	 	} else if (!letterFound){
			checklose();
		}
  	}

});
