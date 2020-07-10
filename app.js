const express = require('express');
const app = express();

app.set ('view engine', 'ejs');

app.use(express.static('./public/assets'));

app.listen(3000);

var todoController = require('./controllers/todoController');
todoController(app)