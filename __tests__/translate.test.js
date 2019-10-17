const {
	isDigit,
	isLetter,
	isVowel,
	isConsonant,
	isCapitalized,
	findConsonantSound,
	removePunctuation,
	translateWord,
	translateSentence
} = require('../translate');

test('If a word starts with a vowel letter, add prefix “g” to the word', () => {
	const gopherWord = translateWord('apple');
	expect(gopherWord).toBe('gapple');
});

test('If a word starts with the consonant letters “xr”, add the prefix “ge” to the begging of the word.', () => {
	const gopherWord = translateWord('Xray');
	expect(gopherWord).toBe('Gexray');
});

test(`If a word starts with a consonant sound, 
    move it to the end of the word and then add “ogo” suffix to the word. 
    Consonant sounds can be made up of multiple consonants, 
    a.k.a. a consonant cluster`, () => {
	const gopherWord = translateWord('chair');
	expect(gopherWord).toBe('airchogo');
});

test(`If a word starts with a consonant sound followed by "qu", 
    move it to the end of the word, and then add "ogo" suffix to the wor`, () => {
	const gopherWord = translateWord('Square');
	expect(gopherWord).toBe('Aresquogo');
});

test('If the word is string of numbers returns it without change', () => {
	const gopherWord = translateWord('123');
	expect(gopherWord).toBe('123');
});

test(`By given English sentence 
    (in which each whitespace separated sequence counts as single word) 
    should return the sentence translation in gopher language`, () => {
	const gopherSentence = translateSentence('This is example sentence!');
	expect(gopherSentence).toBe('Isthogo gis gexample entencesogo!');
});

test('If the sentence is string of numbers returns it without change', () => {
	const gopherSentence = translateSentence('123 456 789');
	expect(gopherSentence).toBe('123 456 789');
});

test('should identify if the input is digit or not', () => {
	const digit = isDigit('9');
	expect(digit).toBeTruthy();
});

test('should identify if the input is digit or not', () => {
	const letter = isDigit('m');
	expect(letter).toBeFalsy();
});

test('should identify if the input is letter or not', () => {
	const letter = isLetter('A');
	expect(letter).toBeTruthy();
});

test('should identify if the input is letter or not', () => {
	const notLetter = isLetter('#');
	expect(notLetter).toBeFalsy();
});

test('should identify if the input is vowel or not', () => {
	const vowel = isVowel('e');
	expect(vowel).toBeTruthy();
});

test('should identify if the input is vowel or not', () => {
	const consonant = isVowel('f');
	expect(consonant).toBeFalsy();
});

test('should identify if the input is consonant or not', () => {
	const consonant = isConsonant('Q');
	expect(consonant).toBeTruthy();
});

test('should identify if the input is consonant or not', () => {
	const vowel = isConsonant('o');
	expect(vowel).toBeFalsy();
});

test('should identify if the input is capitalized or not', () => {
	const capitalized = isCapitalized('Word');
	expect(capitalized).toBeTruthy();
});

test('should identify if the input is capitalized or not', () => {
	const notCapitalized = isCapitalized('word');
	expect(notCapitalized).toBeFalsy();
});

test('should identify if there is consonant sound in the beginning of the word and return it', () => {
	const consonantSound = findConsonantSound('school');
	expect(consonantSound.cluster).toBe('sch');
});

test('should identify if there is consonant sound in the beginning of the word and return it', () => {
	const consonantSound = findConsonantSound('work');
	expect(consonantSound.cluster).toBe('w');
});

test('should identify if there is consonant sound in the beginning of the word and return it', () => {
	const consonantSound = findConsonantSound('alignment');
	expect(consonantSound).toBeNull();
});

test('should remove punctuation of given string and return it', () => {
	const punctuationlessSentence = removePunctuation(
		"I bought some olives, which we didn't eat, when I went shopping last week."
	);
	expect(punctuationlessSentence).toBe('I bought some olives which we didnt eat when I went shopping last week');
});
