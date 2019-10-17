const express = require('express');
const router = express.Router();

const { postRedirect } = require('./common');
const { history } = require('../models/history');

router.post('/', (req, res) => {
	const englishSentence = req.body.sentence;
	postRedirect(res, englishSentence, 'sentence');
});

router.get('/', (req, res) => {
	const dictiondaryEntry = history.reverse().find((entry) => entry.type === 'sentence');
	dictiondaryEntry
		? res.json({ [dictiondaryEntry.english]: dictiondaryEntry.gopher })
		: res.status(400).json('No entryes');
});

module.exports = router;
