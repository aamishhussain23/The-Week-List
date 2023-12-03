const express = require('express')
const isAuthenticated = require('../middleware/auth')
const {getAllTasks, createTasks, updateTask, deleteTask, markUnmark} = require('../controllers/task')
const check24 = require('../middleware/check24')

const router = express.Router()

router.get('/all-task', isAuthenticated, getAllTasks)
router.post('/create-task/:id', isAuthenticated, createTasks)
router.post('/update-task/:id', isAuthenticated, updateTask)
router.get('/delete-task/:id', isAuthenticated, deleteTask)
router.get('/task/:id', isAuthenticated, markUnmark)

module.exports = router