const fs = require('fs/promises')

const isAccessible = (folderName) => {
    return fs
        .access(folderName)
        .then(() => true)
        .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
    if (!(await isAccessible(folder))) {
        await fs.mkdir(folder)
    }
}

module.exports = createFolderIsNotExist