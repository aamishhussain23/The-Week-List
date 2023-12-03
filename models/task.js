const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
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