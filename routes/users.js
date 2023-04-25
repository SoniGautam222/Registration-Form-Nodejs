const express=require('express');
const router=express.Router();
const User=require('../models/users');
const { registerValidation , loginValidation} = require('../validation');
const bcrypt =require('bcryptjs');



router.get('/home', (req,res)=>{
    res.render('home');
});

router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/register', (req,res)=>{
    res.render('register');
});


// registeration logic is here!!
router.post('/register',async (req,res)=>{

    // validating the data here!
    const {error} = registerValidation(req.body);
    // console.log(error);
    if(error) return res.status(400).send(error);

    // checking if the user is already in the database
   const emailExist= await User.findOne({email: req.body.email})
   if(emailExist) return res.status(400).send('Email already exists ');
   
    // hash the password!!
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    //creating the new user here
    const newUser =  new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    // saving the database
    try{
        const userData=newUser.save();
        res.status(201).render('login');
    }
    catch(err){
        res.status(400).send(err);
    }
})

// login logic
    router.post('/login',async(req,res)=>{
        // console.log("inside login !!!");
        const {error} = loginValidation(req.body);
        // console.log(error);
        if(error) return res.status(400).send(error);
      

        // checking if there email is exists or not!!
        const user= await User.findOne({email:req.body.email});
        if(!user) return res.status(400).render('register');

        // password checking 
        const validPass= await bcrypt.compare(req.body.password,user.password);
        // const validPass=req.body.password==user.password;
        if(!validPass){
            return res.status(400).render('login');

        }
            res.status(200).render('home');
        
})







module.exports=router;