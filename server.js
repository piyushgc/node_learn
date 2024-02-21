const express = require('express');
const app = express();
const db = require('./db');

require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const _ = require('lodash');

// const arr = ['person','hello',1,1,2,2,8,3];
// let filter = _.reverse(arr);
// console.log(filter);
//middle ware
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); //use to move forward  -->current middle ware function completed
}
app.use(logRequest);   //login time on evry routes


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send('Welcome to our Hotels');
})

//import router of person
const personRoutes = require('./Routes/personRoutes');
app.use('/person',personRoutes);

//import router of menu

const menuRoutes = require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

const PORT = process.env.PORT||9000;
app.listen(PORT,()=>{
    console.log('listening port :'+ PORT);
});

// const fs = require('fs');
// const os = require('os');

// const user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi'+ user.username + '!\n',()=>{
//     console.log('file is created');
// })