const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
const missed = 0;

const phrases = [
	'Ayyyyyyy',
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
			phrase.appendChild(li);
			if(arr[i] !== ' ') {
				li.className = 'letter';
			} else {
				li.className = 'space';
			}
	  }
	  return arr;
}


//console.log(getRandomPhraseAsArray(phrases));
const phraseArray = getRandomPhraseAsArray(phrases);
//These are not displaying the same phrases in the console. Does this matter or does it only matter what is in the display function?
console.log(addPhraseToDisplay(phraseArray));
addPhraseToDisplay(phraseArray);

function checkLetter(letterkeys) {
	let check = false;

	for (var i = 0; i < letters.length; i += 1) {

	    if (letterkeys.target.textContent === letters[i].textContent.toUpperCase()) {

	        letters[i].classList.add('show');
	        check = true;
	    } else {

			check = 'null';
		}
	}
	return check; //This function is not returning anything but null. why?
}

qwerty.addEventListener('click', (e) => {
	console.log(e.target);
	let letterSelect = checkLetter(e);
	console.log(letterSelect);
	for (i = 0; i < letterSelect.length; i+= 1 ) {
		if (e.target.tagName === 'BUTTON'){
		 	e.target.classList.add('chosen');
			e.target.disabled = true;
		}
	 }
});


//function checkwin(){}
