var Connection = require('./connection')


class Poem {
	constructor (title, text) {
		this.title = title;
		this.text = text;
		this.connections = [];
		this.conditions = {};
	}
	connect(poem, condition) {
		if (this.conditions[condition]) throw new Error(`There is already a connection with the condition ${condition}.`);
		var connection = new Connection(poem, condition);
		this.connections.push(connection);
		this.conditions[condition] = connection;
	}
}

module.exports = Poem
