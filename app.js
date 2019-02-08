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

const phrases = [
	'We are the Champions',
	'Wassup',
	'Another one bites the dust',
	'Is this the real life',
	'Elementary my dear Watson'
]

//Hides the Wheel of Success overlay to display game
overlay.addEventListener('click', (e) => {
    if (e.target.textContent === 'Start Game') {
        overlay.style.display = 'none';
    } else if (e.target.textContent === 'Start a New Game') {
        overlay.style.display = 'none';
	
    } else if (e.target.textContent === 'Try Again?') {
        overlay.style.display = 'none';

	}
});

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

function checkwin(x, y, z){
	if (x.length === y.length && z <= 5) {
		reset.innerHTML = 'Start a New Game';
		overlay.style.display = 'flex';
		overlay.classList.add('win');
	}
}

qwerty.addEventListener('click', (e) => {
	let letterFound = checkLetter(e.target);
	if (letterFound && e.target.tagName === 'BUTTON'){
	  e.target.classList.add('chosen');
	  e.target.disabled = true;
  	} else if(!letterFound && e.target.tagName === 'BUTTON'){
	  	e.target.classList.add('chosen');
   		e.target.disabled = true;
		if (missed < 5) {
			missed += 1;
			let ol = scoreboard.getElementsByTagName('ol')[0];
			let li = scoreboard.querySelector('li:last-child');
	  		ol.removeChild(li);
		} else {
		  reset.innerHTML = 'Try Again?';
		  overlay.style.display = 'flex';
		  overlay.classList.add('lose');
	  }
	}
	checkwin(show, letters, missed);

});
