function isLetter(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function isVowel(c) {
	return [ 'a', 'e', 'i', 'o', 'u' ].indexOf(c.toLowerCase()) !== -1;
}

function isConsonant(c) {
	return !isVowel(c.toLowerCase()) && isLetter(c);
}

function isCapitalized(str) {
	return str[0] === str[0].toUpperCase();
}

function findConsonantSound(word) {
	const wordArr = word.split('');
	const consonantSound = {
		cluster: '',
		numOfConsonantLetters: 0
	};
	if (isConsonant(wordArr[0])) {
		for (let i = 0; i < wordArr.length; i++) {
			if (isConsonant(wordArr[i])) {
				consonantSound.cluster += wordArr[i];
				consonantSound.numOfConsonantLetters++;
			} else {
				break;
			}
		}
		return consonantSound;
	}
	return null;
}

function removePunctuation(str) {
	if (str) {
		const punctuationless = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?\"\']/g, '');
		return punctuationless.replace(/\s{2,}/g, ' ');
	}
}

function translateWord(word) {
	if (word) {
		const capitalized = isCapitalized(word);
		word = removePunctuation(word);
		word = word.toLowerCase();
		const wordArr = word.split('');
		if (isVowel(wordArr[0])) {
			return capitalized ? 'G' + word : 'g' + word;
		}
		if (wordArr[0] === 'x' && wordArr[1] === 'r') {
			return capitalized ? 'Ge' + word : 'ge' + word;
		}
		const consonantSound = findConsonantSound(word);
		if (consonantSound) {
			let gopherWord = '';
			if (
				wordArr[consonantSound.numOfConsonantLetters - 1] === 'q' &&
				wordArr[consonantSound.numOfConsonantLetters] === 'u'
			) {
				wordArr.splice(0, consonantSound.numOfConsonantLetters + 1);
				gopherWord = wordArr.join('') + consonantSound.cluster + 'u' + 'ogo';
			} else {
				wordArr.splice(0, consonantSound.numOfConsonantLetters);
				gopherWord = wordArr.join('') + consonantSound.cluster + 'ogo';
			}
			return capitalized ? gopherWord.charAt(0).toUpperCase() + gopherWord.slice(1) : gopherWord;
		}
	}
}

function translateSentence(sentence) {
	if (sentence) {
		const capitalized = isCapitalized(sentence);
		const endPunctuationMark = sentence.split('').pop();
		sentence = removePunctuation(sentence);
		const sentenceArr = sentence.split(' ');
		const translatedArr = [];
		sentenceArr.forEach((word) => {
			translatedArr.push(translateWord(word));
		});
		const translatedSentence = translatedArr.join(' ').toLowerCase() + endPunctuationMark;
		return capitalized
			? translatedSentence.charAt(0).toUpperCase() + translatedSentence.slice(1)
			: translatedSentence;
	}
}

module.exports.translateWord = translateWord;
module.exports.translateSentence = translateSentence;
