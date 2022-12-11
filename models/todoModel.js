const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todoThing: {
        type: String,
        require: true
    },
    completed: Boolean
}) 

module.exports = mongoose.model('TodoCollection', todoSchema)