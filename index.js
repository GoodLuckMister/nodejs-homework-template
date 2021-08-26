const app = require('./src/app')
const client = require('./src/db')
const createFolderIsNotExist = require('./src/helpers/create-folder')
require('dotenv').config()



const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

client.then(() => {
    app.listen(PORT, async () => {
        await createFolderIsNotExist(UPLOAD_DIR)
        await createFolderIsNotExist(AVATAR_OF_USERS)
        console.log(`Server running. Use our API on port: ${PORT}`)
    })
}).catch((e) => {
    console.log(`Server not running. Error message ${e.message}`)
})
