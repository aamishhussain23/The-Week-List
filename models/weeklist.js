const mongoose = require('mongoose')
// const moment = require('moment-timezone');


const weeklistSchema = new mongoose.Schema({
    weeklist_number : {
        type : Number,
        default: 1
    },
    createdAt : {
        type : Date,
        // default: () => moment().tz('Asia/Kolkata').toDate()
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
        required: true,
    },

})

const weeklistCollection = new mongoose.model('weeklistCollection', weeklistSchema)

module.exports = weeklistCollection