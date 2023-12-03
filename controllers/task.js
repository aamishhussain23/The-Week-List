const taskCollection = require("../models/task")

const getAllTasks = (req, res) => {
    res.json({
        message : 'working tasks routes'
    })
}


const createTasks = async (req, res) => {

    try {
        const {description} = req.body
        const {id} = req.params
        const weeklist = 0;
        const newTask = await taskCollection.create({description, weeklist : id})
        res.json({
            message : 'task created successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : error
        })
    }
}

module.exports = {getAllTasks, createTasks}