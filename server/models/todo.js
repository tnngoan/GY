const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	title: {
		type: "String",
		required: true,
	},
	category: {
		type: "String",
		required: true,
	},
	isCompleted: {
		type: "Boolean",
		default: false
	}
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;