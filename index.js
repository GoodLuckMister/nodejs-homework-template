const app = require('./src/app')

const client = require('./src/db')
const createFolderIsNotExist = require('./src/helpers/create-folder')
// const path = require('path')
require('dotenv').config()


const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR

// const STATIC_OF_USERS = process.env.STATIC_OF_USERS
// const AVATARS = process.env.AVATARS

client.then(() => {
    app.listen(PORT, async () => {
        await createFolderIsNotExist(UPLOAD_DIR)
        // await createFolderIsNotExist(STATIC_OF_USERS)
        // await createFolderIsNotExist(path.join(STATIC_OF_USERS, AVATARS))
        console.log(`Server running. Use our API on port: ${PORT}`)
    })
}).catch((e) => {
    console.log(`Server not running. Error message ${e.message}`)
})
