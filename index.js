const express = require('express');
const repositoryRoutes = require('./app/routes/repository');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/repositories', repositoryRoutes);

app.listen(process.env.PORT || 3000);