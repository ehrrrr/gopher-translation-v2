const express = require('express');
const router = express.Router();

const { history, Entry } = require('../data/history');
const { translateSentence } = require('../translate');

router.post('/', (req, res) => {
	const english = req.body['english-sentence'];
	if (english && typeof english === 'string') {
		const gopher = translateSentence(english);
		const type = 'sentence';
		const entry = new Entry(english, gopher, type);
		history.push(entry);
		res.status(200).json({ 'gopher-sentence': entry.gopher });
	} else {
		res.status(400).json('Not valid input.');
	}
});

module.exports = router;
