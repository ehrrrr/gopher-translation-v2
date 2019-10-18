const express = require('express');
const router = express.Router();

const { history, Entry } = require('../data/history');
const { translateWord } = require('../translate');

router.post('/', (req, res) => {
	const english = req.body.word;
	if (english && typeof english === 'string') {
		const gopher = translateWord(english);
		const type = 'word';
		const entry = new Entry(english, gopher, type);
		history.push(entry);
		res.status(200).json({ 'gopher-word': entry.gopher });
	} else {
		res.status(400).json('Not valid input.');
	}
});

module.exports = router;
