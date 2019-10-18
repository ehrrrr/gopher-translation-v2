const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
	console.log(`Server has started! \nApp is running on port ${PORT}`);
});

module.exports = app;
