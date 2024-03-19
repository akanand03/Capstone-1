const userctrl = require('../controllers/userctrl')

const router = require('express').Router()

router.post('/register',userctrl.register)

module.exports = router