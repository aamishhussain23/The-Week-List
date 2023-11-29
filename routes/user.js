const express = require('express')
const {home, register, login, notFound, health} = require('../controllers/user')

const router = express.Router()

router.get('/', home)
router.post('/register', register)
router.post('/login', login)
router.get('/health', health)
router.get('*', notFound)

module.exports = router