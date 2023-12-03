const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    markedAt : {
        type : Date,
        default : null
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    weeklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "weeklistCollection",
        required: true,
    },
})

const taskCollection = new mongoose.model('taskCollection', taskSchema)

module.exports = taskCollection