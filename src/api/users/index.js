const express = require('express')
const controllerUser = require('../../controllers/users')
const router = express.Router()
const guard = require('../../helpers/guard')
router.get('/current', guard, controllerUser.getCurrentUser)
router.post('/registration', controllerUser.reg)
router.post('/login', controllerUser.login)
router.post('/logout', guard, controllerUser.logout)




module.exports = router