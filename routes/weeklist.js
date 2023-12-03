const express = require('express')
const addWeekList = require('../controllers/addWeekList')
const isAuthenticated = require('../middleware/auth')
const router = express.Router()

router.post('/create-weeklist',isAuthenticated, addWeekList)

module.exports = router