const weeklistCollection = require("../models/weeklist")
const taskCollection = require("../models/task")

const addWeekList = async (req, res) => {
    try {

        const existingWeeklistsCount = await weeklistCollection.countDocuments({ user: req.user._id });
        if (existingWeeklistsCount === 2) {
            return res.status(400).json({
                success: false,
                message: 'Cannot create more than two weeklists for a user',
            });
        }

        const newWeeklist = new weeklistCollection();

        const highest_weeklist = await weeklistCollection.findOne({ user: req.user._id }).sort({ weeklist_number: -1 })

        if(!highest_weeklist){
            newWeeklist.user = req.user._id
            await newWeeklist.save()
            
            return res.status(201).json({
                success : true,
                message : 'first weeklist created'
            })
        }
        newWeeklist.weeklist_number = highest_weeklist.weeklist_number + 1
        newWeeklist.user = req.user._id

        await newWeeklist.save()

        res.status(201).json({
            success: true,
            message: 'Week list created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = addWeekList