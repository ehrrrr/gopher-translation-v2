const express = require('express');
const router = express.Router();

const { history } = require('../models/history');

router.get('/', (req, res) => {
	if (history.length) {
		const response = [];
		history.forEach((entry) => {
			const { english, gopher } = entry;
			response.push({ [english]: gopher });
		});
		res.json(response);
	} else {
		res.status(400).json('No entryes');
	}
});

module.exports = router;
