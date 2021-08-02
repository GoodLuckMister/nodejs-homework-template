const express = require('express')
const controllerContacts = require('../../controllers/contacts')
const router = express.Router()
const { validateCreateContact, validateUpdateContact, validateUpdateStatusContact } = require('../../validators')
const guard = require('../../helpers/guard')

router.get('/', guard, controllerContacts.getAll)
    .get('/:id', guard, controllerContacts.getById)
    .post('/', guard, validateCreateContact, controllerContacts.create)
    .put('/:id', guard, validateUpdateContact, controllerContacts.update)
    .patch('/:id/favorite', guard, validateUpdateStatusContact, controllerContacts.update)
    .delete('/:id', guard, controllerContacts.remove)

module.exports = router