const express = require('express');
const router = express.Router();

const { postRedirect } = require('./common');
const { history } = require('../models/history');

router.post('/', (req, res) => {
	const english = req.body.word;
	english.split(' ').length > 1 ? postRedirect(res, english, 'sentence') : postRedirect(res, english, 'word');
});

router.get('/', (req, res) => {
	const dictiondaryEntry = history.reverse().find((entry) => entry.type === 'word');
	dictiondaryEntry
		? res.json({ [dictiondaryEntry.english]: dictiondaryEntry.gopher })
		: res.status(400).json('No entryes');
});

module.exports = router;
