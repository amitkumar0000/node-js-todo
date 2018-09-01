var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//connect to DB
mongoose.connect('mongodb://test:mlab1985@ds247290.mlab.com:47290/todo')

//Create a schema
var todoSchema = new mongoose.Schema({
  item : String
})

var Todo = mongoose.model('Todo',todoSchema)

// var itemOne = Todo({item : "buy flower"}).save(function(err){
//   if(err) throw err
//   console.log("item saved")
// })

// var data = [{item:'get milk'}, {item:'walk dag'}, {item:'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended:false})
module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongodb and pass to view
    Todo.find({},function(err,data){
      if(err) throw err
      res.render('todo',{todos : data})
    })
  })

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from view and add it to mongoDb
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err
      res.json(data)
    })
      // data.push(req.body)
      // res.json(data)
  })

  app.delete('/todo/:item',function(req,res){
    //delete the requested item from mongoDb

    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err
      res.json(data)
    })
      // data = data.filter(function(todo){
      //   return todo.item.replace(/ /g ,'-') !== req.params.item
      // })
      // console.log(req.body)
      // res.json(data)
  })

}
