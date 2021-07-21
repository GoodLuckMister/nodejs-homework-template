const fs = require('fs/promises')
const path = require('path')
const pathContacts = path.join(__dirname, 'contacts.json')
const contacts = require('./contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(pathContacts)
    return JSON.parse(data)
  } catch (e) {
    if (e) throw e
  }
}

const getContactById = async (contactId) => {
  try {
    return await contacts.filter(el => el.id === contactId)
  } catch (e) {
    if (e) throw e
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await contacts.filter(el => el.id !== contactId)
    await fs.writeFile(pathContacts, JSON.stringify(data), (e) => {
      if (e) throw e
    })
    return console.table(data)
  } catch (e) {
    return `Hello some else ${e.message}`
  }
}

const addContact = async (body) => {
  try {
    const data = [...contacts, body]
    await fs.writeFile(pathContacts, JSON.stringify(data), (e) => {
      if (e) throw e
    })
    return console.table(data)
  } catch (e) {
    return `Hello some else ${e.message}`
  }
}

const updateContact = async (contactId, body) => {
  const [contact] = await getContactById(contactId)

  return { ...contact, ...body }
}
updateContact(1, { id: 22 }).then(r => console.log(r))

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
