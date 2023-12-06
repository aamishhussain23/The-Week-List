const mongoose = require('mongoose')
// const moment = require('moment-timezone');


const weeklistSchema = new mongoose.Schema({
    weeklistName : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        // default: () => moment().tz('Asia/Kolkata').toDate()
        default: Date.now
    },
    expireOn : {
        type : Date,
        default : () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    timeLeft : {
        type : String,
        default : null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
        required: true,
    },

})

const weeklistCollection = new mongoose.model('weeklistCollection', weeklistSchema)

module.exports = weeklistCollection