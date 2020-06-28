const express = require('express');
const app = express();

app.set ('view engine', 'ejs');

//map /assets route to static files in ./public
//app.use('/assets', express.static('./public'));

app.use(express.static('./public'));

//listen to a port
app.listen(3000);

var todoController = require('./controllers/todoController');
todoController(app);

//mongodb+srv://<username>:<password>@cluster0-1vure.azure.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://musclex09_boy:0-experT@cluster0-1vure.azure.mongodb.net/NetNinjaTo-DoApp?retryWrites=true&w=majority