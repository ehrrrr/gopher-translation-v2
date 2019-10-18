const serverURL = 'http://localhost:3000/';

const input = document.getElementById('home-page-input');
const btn = document.getElementById('btn');
const form = document.getElementById('form-section');
const section = document.getElementById('dynamic-section');
const homeMenu = document.getElementById('home');
const wordMenu = document.getElementById('word');
const sentenceMenu = document.getElementById('sentence');
const historyMenu = document.getElementById('history');

homeMenu.addEventListener('click', function(event) {
	displayHome();
});

wordMenu.addEventListener('click', function(event) {
	displayWord('', '');
});

sentenceMenu.addEventListener('click', function(event) {
	displaySentence('', '');
});

historyMenu.addEventListener('click', function() {
	displayHistory();
	getHistory().then((res) => {
		document.getElementById('history-entries').innerHTML = displayHistoryEntries(res.history);
	});
});

btn.addEventListener('click', function(event) {
	const text = input.value;
	if (text.length) {
		if (isWord(text)) {
			makePostRequest('word', text).then((gopher) => displayWord(text, Object.values(gopher)));
		} else {
			makePostRequest('sentence', text).then((gopher) => displaySentence(text, Object.values(gopher)));
		}
	}
	input.value = '';
});

input.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		btn.click();
	}
});

function isWord(text) {
	if (text.split(' ').length > 1) {
		return false;
	}
	return true;
}

async function makePostRequest(route, text) {
	return await fetch(serverURL + route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			[route]: text
		})
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((err) => console.log('Error\n' + err));
}

async function getHistory() {
	return await fetch(serverURL + 'history')
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => console.error(error));
}

function displayHome() {
	const component = `
	<header>
		<h1 id="title">Gopher Language Translation</h1>
		<h2 id="subtitle">Translate English word or sentence into gophers' language.</h2>
	</header>
	`;
	section.innerHTML = component;
	form.classList.remove('hidden');
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('home').classList.add('active');
}

function displayWord(english, gopher) {
	const component = `
	<header>
        <h2 id="subtitle" class="big-subtitle">Translate English <span class="highlight">word</span> into gophers' language.</h2>
    </header>
    
    <div class="container">
        <div class="row">
            <div class="column word-container">
                <p>
                    English: <span class="display-word">${english}</span>
                </p>
            </div>
            <div class="column">
                <p class="arrow">
                    &#8658;
                </p>
            </div>
            <div class="column word-container">
                <p>
                    Gopher: <span class="display-word">${gopher}</span>
                </p>
            </div>
        </div>
    </div>
	`;
	section.innerHTML = component;
	form.classList.remove('hidden');
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('word').classList.add('active');
}

function displaySentence(english, gopher) {
	const component = `
	<header>
    	<h2 id="subtitle" class="big-subtitle">Translate English <span class="highlight">sentence</span> into gophers' language.</h2>
	</header>
	<div class="container">
		<div class="row">
			<p class="sentence-row">
				English: <span class="display-word">${english}</span>
			</p>
		</div>
		<div class="row">
			<p class="arrow sentence-row">
				&#8659;
			</p>
		</div>
		<div class="row">
			<p class="sentence-row">
				Gopher: <span class="display-word">${gopher}</span>
			</p>
		</div>
	</div>
	`;
	section.innerHTML = component;
	form.classList.remove('hidden');
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('sentence').classList.add('active');
}

function displayHistoryEntries(history) {
	let entries = '';
	if (history.length > 0) {
		history.forEach((entry) => {
			entries += `
			<div class="row history-block">
				<div class="column word-container">
					<p>
						English: <span class="display-word">${Object.keys(entry)}</span>
					</p>
				</div>
				<div class="column">
					<p class="arrow">
						&#8658;
					</p>
				</div>
				<div class="column word-container">
					<p>
						Gopher: <span class="display-word">${Object.values(entry)}</span>
					</p>
				</div>
			</div>
			`;
		});
	} else {
		entries = '<p>No translations available. The history is empty.</p>';
	}
	return entries;
}

function displayHistory() {
	const component = `
	<header id="history-header">
        <h1 id="title">Gopher Language Translation</h1>
        <h2 id="subtitle" class="big-subtitle">History</h2>
    </header>
    <main>
        <div id="history-entries" class="container history-container">
        </div>
    </main>
	`;
	section.innerHTML = component;
	form.classList.add('hidden');
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('history').classList.add('active');
}
