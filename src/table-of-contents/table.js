var Poem = require('./poem')
//game
class Table {
	constructor() {
		this.poems = {};
		this.startingPoint = null;
	}
	addPoem(name, text) {
		if (this.poems[name]) throw new Error(`There is already a poem named "${name}" in this game.`);
		var newPoem = new Poem(name, text);
		if (!this.startingPoint) this.startingPoint = newPoem;
		this.poems[name] = newPoem;
		return newPoem;
	}
	getPoem(name) {
		return this.poems[name];
	}
	connect(name1, name2, condition) {
		if (!this.poems[name1]) throw new Error(`There is no poem named "${name1}"" in this table.`)
		var poem1 = this.getPoem(poem1);
		var poem2 = this.getPoem(poem2);
		poem1.connect(poem2, condition);
	}
}

module.exports = Game
