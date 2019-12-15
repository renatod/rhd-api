const express = require('express')
const repositoryRoutes = require('./routes/repository')
const cors = require('cors')

const server = express()
server.use(cors())
server.use('/repositories', repositoryRoutes)

module.exports = server