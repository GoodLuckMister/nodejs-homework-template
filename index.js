const app = require('./src/app')
const { connect } = require('./src/db')

const PORT = process.env.PORT || 3000

    ; (async (connect) => {
        try {
            await connect
            app.listen(PORT, () => {
                console.log(`Server running. Use our API on port: ${PORT}`)
            })
        } catch (e) {
            console.log(`Server not running. Error message ${e.message}`)
        }
    })(connect)
