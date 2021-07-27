const express = require('express')
const controllerContacts = require('../controllers')
const router = express.Router()
const { validateCreateContact, validateUpdateContact, validateUpdateStatusContact } = require('../validators')

router.get('/', controllerContacts.getAll)
  .get('/:id', controllerContacts.getById)
  .post('/', validateCreateContact, controllerContacts.create)
  .put('/:id', validateUpdateContact, controllerContacts.update)
  .patch('/:id/isVaccinated', validateUpdateStatusContact, controllerContacts.updateStatus)
  .delete('/:id', controllerContacts.remove)

module.exports = router
