const weeklistCollection = require("../models/weeklist");

const check24 = async (req, res, next, msg) => {
    const {id} = req.params

    const weeklist = await weeklistCollection.findById(id)

    const timeDifference = new Date() - weeklist.createdAt;

    if (timeDifference > 24 * 60 * 60 * 1000) {
        return res.status(400).json({
            success: false,
            message: msg,
        });
    }

    next()
}


module.exports = check24