const translate = require('./translate');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const history = [];
class Entry {
	constructor(english, gopher, type) {
		this.english = english;
		this.gopher = gopher;
		this.type = type;
	}
}

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/word', (req, res) => {
	const english = req.body.word;
	english.split(' ').length > 1 ? postRedirect(res, english, 'sentence') : postRedirect(res, english, 'word');
});

app.get('/word', (req, res) => {
	const dictiondaryEntry = history.reverse().find((entry) => entry.type === 'word');
	dictiondaryEntry
		? res.json({ [dictiondaryEntry.english]: dictiondaryEntry.gopher })
		: res.status(400).json('No entryes');
});

app.post('/sentence', (req, res) => {
	const englishSentence = req.body.sentence;
	postRedirect(res, englishSentence, 'sentence');
});

app.get('/sentence', (req, res) => {
	const dictiondaryEntry = history.reverse().find((entry) => entry.type === 'sentence');
	dictiondaryEntry
		? res.json({ [dictiondaryEntry.english]: dictiondaryEntry.gopher })
		: res.status(400).json('No entryes');
});

app.get('/history', (req, res) => {
	history.length ? res.json(history) : res.status(400).json('No entryes');
});

app.listen(PORT, () => {
	console.log(`Server has started! \nApp is running on port ${PORT}`);
});

function postRedirect(res, english, type) {
	if (english) {
		let gopher = '';
		type === 'word' ? (gopher = translate.translateWord(english)) : (gopher = translate.translateSentence(english));
		let dictiondaryEntry = new Entry(english, gopher, type);
		history.push(dictiondaryEntry);
		res.redirect('/' + type);
	}
}
