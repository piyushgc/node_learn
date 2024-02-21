
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //use to handle user_name and password strategy
const person = require('./models/person')


passport.use(new LocalStrategy(async (Username,password,done)=>{
    try{
        // console.log('Received credentials:',Username,password);
        const user  = await person.findOne({username:Username});

        if(!user){
                return done(null,false,{message : 'Incorrect username.'});
        }
         const isPassword = user.comparePassword(password)
        if(isPassword){
            return done(null,user);
        } 
        else{
            return done(null,false,{message : 'Incorrect Password'});
        }

    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;