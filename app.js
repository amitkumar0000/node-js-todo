var express = require('express')

var todoController = require('./controller/todocontroller')

var app = express()

//set up template engine
app.set('view engine','ejs')

//static files
app.use(express.static('./public'))

//listen to port

app.listen(process.env.PORT || 3000)

//fire up todoController
todoController(app)

console.log('you are listening to port 3000 '+process.env.PORT)
