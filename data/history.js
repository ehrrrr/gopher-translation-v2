const history = [];
class Entry {
	constructor(english, gopher, type) {
		this.english = english;
		this.gopher = gopher;
		this.type = type;
	}
}

module.exports.history = history;
module.exports.Entry = Entry;
