const express = require('express')
const controllerContacts = require('../../controllers/contacts')
const { validateCreateContact, validateUpdateContact, validateUpdateStatusContact } = require('../../validators/contacts')
const guard = require('../../helpers/guard')

const router = express.Router()

router.get('/', guard, controllerContacts.getAll)
    .get('/:id', guard, controllerContacts.getById)
    .post('/', guard, validateCreateContact, controllerContacts.create)
    .put('/:id', guard, validateUpdateContact, controllerContacts.update)
    .patch('/:id/favorite', guard, validateUpdateStatusContact, controllerContacts.update)
    .delete('/:id', guard, controllerContacts.remove)

module.exports = router