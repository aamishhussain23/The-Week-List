const express = require('express')
const isAuthenticated = require('../middleware/auth')
const {getAllTasks, createTasks} = require('../controllers/task')

const router = express.Router()

router.get('/all-task', isAuthenticated, getAllTasks)
router.post('/create-task/:id', isAuthenticated, createTasks)

module.exports = router