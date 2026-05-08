const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller.cjs')
//login
router.post('/api/login', controller.login)

//register
router.post('/api/register', controller.register)

module.exports = router;