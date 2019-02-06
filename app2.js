const overlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');

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



function getRandomPhraseArray(rp){
    //do stuff to any arr that is passed in
		const randomPhrases = Math.floor(Math.random() * rp.length);
		return rp[randomPhrases].split("");
}

//console.log(getRandomPhraseArray(phrases));
const rpArray = getRandomPhraseArray(phrases);

function addPhraseToDisplay(ap){
    // do stuff any arr that is passed in, and add to `#phrase ul`
	  var listHTML ='<ul>';
	  for(var i = 0; i < rpArray[i].length; i += 1) {
	    listHTML += '<li>' + rpArray[i] + " </li> ";
	  }
	  listHTML += '</ul>';

		phrase.append(listHTML);

		return ap;
}
 console.log(addPhraseToDisplay(rpArray));

//const phraseArray = getRandomPhraseAsArray(phrases);
// addPhrasetoDisplay(phraseArray);
//
// function checkLetter(){
//
// }

//function checkwin(){}
