const express = require('express');
const router = express.Router();

const { history } = require('../data/history');

router.get('/', (req, res) => {
	if (history.length) {
		const response = [];
		const sortedHistory = history.sort(function(a, b) {
			if (a.english.toLowerCase() < b.english.toLowerCase()) {
				return -1;
			}
			if (a.english.toLowerCase() > b.english.toLowerCase()) {
				return 1;
			}
			return 0;
		});
		sortedHistory.forEach((entry) => {
			const { english, gopher } = entry;
			response.push({ [english]: gopher });
		});

		res.json({
			history: response
		});
	} else {
		res.status(200).json({
			history: []
		});
	}
});

module.exports = router;
