const express=require('express');
const port=8000;

// mongoose are here
const mongoose=require('mongoose');



// creating the express applcation
const app=express();


// setting the view engine
app.set('view engine', 'ejs' );
// path of the view
app.set('views', './views');

mongoose.connect('mongodb://127.0.0.1/registration');
const db=mongoose.connection;

// to check if the connection is open or not 
db.on('open', ()=>{
    console.log('connected to the mongoDB!!! yippee');
})

// adding the middle wares
app.use(express.json());
app.use(express.urlencoded());

// importing the routes
const usersRouter=require('./routes/users')
app.use('/web',usersRouter);



//listing the server
app.listen(port,function(err){
    if(err){
        console.log(`There is the error ${err}`);
    }else{
        console.log(`Server is running on the port: ${port}`);
    }
})