const express = require('express');
const repositoryRoutes = require('./app/routes/repository');
const app = express();

app.use('/repositories', repositoryRoutes);

app.listen(process.env.PORT || 3000);