const express = require('express')
const controllerContacts = require('../controllers')
const router = express.Router()

router.get('/', controllerContacts.getAll)
  .get('/:id', controllerContacts.getById)
  .post('/', controllerContacts.create)
  .put('/:id', controllerContacts.update)
  .patch('/:id/isVaccinated', controllerContacts.updateStatus)
  .delete('/:id', controllerContacts.remove)

module.exports = router
