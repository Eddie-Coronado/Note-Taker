const express = require('express');
const api = require('./routes/html-routes.js');
const html = require('./routes/api-routes');
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.use('/api', api)
app.use('/', html)

app.listen(PORT,() => console.log(`Now listening on port ${PORT}`))