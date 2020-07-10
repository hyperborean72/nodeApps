const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({urlencoded: false});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://musclex09_boy:0-experT@cluster0-1vure.azure.mongodb.net/NetNinjaTo-DoApp?retryWrites=true&w=majority');

// structure of a single element in Mongo DB collection
var todoSchema = new mongoose.Schema({item: String});

//'Todo' model stored as a 'todos' collection @ Mongo
var Todo = mongoose.model('Todo', todoSchema);

// saving a single element into collection
/* var itemOne = Todo({item: 'give flowers'}).save(function(err){
    if(err) throw err;
    console.log('get flowers saved');
}); */

// export this function by the file path: require('./controllers/todoController')
module.exports = function(appLoc){

    /* index page
        app.get('/',function (req, res) {
            res.render('pages/home')
        });
    */

    appLoc.get('/todo', function(req, res){
        // get data from {data object}, have it as {todo object} at todo.ejs
        //res.render('todo', {todos: data});
        
        // get data from mongodb and pass it to todo.ejs
        // find all or particular object in todos collection | {} - all items
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });

    
    appLoc.post('/todo', urlencodedParser, function(req, res){
        // in case we post form data to todos list item without saving to MongoDB
        /* data.push(req.body);
        res.json(data); */
        
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    
    appLoc.delete('/todo/:item', function(req, res){
        // replace hyphen (in the url, when making delete call) with a space
        Todo.find({item: req.params.item.replace(/\-/g, " ")})
        .remove(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    });  
    
    // FIX IT
    // if you are doing this now (4/4/2020) there is no need to install body-parser; 
    // instead 1. in your app.js app.use(express.json() AND app.use(express.urlencoded({extended: true}) 
    // 2. in you controller, no need to install body-parser, no need to write variable for urlencodedParser,  
    // and you don't have to pass urlencodedParser as middleware
}