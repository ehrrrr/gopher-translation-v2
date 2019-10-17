const { translateWord, translateSentence } = require('../translate');
const { history } = require('../models/history');

class Entry {
	constructor(english, gopher, type) {
		this.english = english;
		this.gopher = gopher;
		this.type = type;
	}
}

function postRedirect(res, english, type) {
	if (english && typeof english === 'string') {
		let gopher = '';
		type === 'word' ? (gopher = translateWord(english)) : (gopher = translateSentence(english));
		let dictiondaryEntry = new Entry(english, gopher, type);
		history.push(dictiondaryEntry);
		res.redirect('/' + type);
	} else {
		res.status(400).json('Not valid input. Accepts only string.');
	}
}

module.exports.postRedirect = postRedirect;
