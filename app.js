const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('ul');
const letters = document.getElementsByClassName('letter');
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


//Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.

function checkwin(){
		let x = document.querySelectorAll('#phrase show').length;
		let y = document.querySelectorAll('#qwerty letters').length;

	  if (missed <= 5 && x.length === y.length) {
	    overlay.style.display = 'win';
	  } else {
			overlay.style.display = 'lose';
		}

}//TODO: Fix checkwin();

qwerty.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON'){
	  let letterFound = checkLetter(e.target);

	 	e.target.classList.add('chosen');
		e.target.disabled = true;
		if (letterFound !== true) {
			missed += 1;
			if (missed <= 5) {
		  	let ol = scoreboard.getElementsByTagName('ol')[0];
				let li = scoreboard.querySelector('li:last-child');
		  	ol.removeChild(li);
			}
		}
		checkwin();
	}

});
