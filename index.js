const server = require('./src/server')
server.listen(process.env.PORT || 3000, () => {
    console.log('API running!')
})