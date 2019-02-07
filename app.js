const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('ul');
const letters = document.getElementsByClassName('letter');
const buttons = document.getElementsByTagName('button');
const scoreboard = document.getElementById('scoreboard');
const tries = document.getElementsByClassName('tries');

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
    if (e.target.className === 'btn__reset') {
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
	if (check !== true) {
		missed += 1;
	}
	return check;
}

function checkwin(){

}

qwerty.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON'){
		let letterFound = checkLetter(e.target);
	 	e.target.classList.add('chosen');
		e.target.disabled = true;
	}

	console.log(missed);
});
