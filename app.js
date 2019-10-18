const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const URL = process.env.ROOT_URL || 'http://localhost:3000/';

const indexRoutes = require('./routes/index');
const wordRoutes = require('./routes/word');
const sentenceRoutes = require('./routes/sentence');
const historyRoutes = require('./routes/history');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/word', wordRoutes);
app.use('/sentence', sentenceRoutes);
app.use('/history', historyRoutes);

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', URL + '/client'); // update to match the domain you will make the request from
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
// });

app.listen(PORT, () => {
	console.log(`Server has started! \nApp is running on port ${PORT}`);
});

module.exports = app;
