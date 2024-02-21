const mongoose=require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name:{
        type :String,
        required : true
    },
    age:{
        type : Number
    },
    work:{
        type : String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required :true
    },

    email:{
        type : String,
        required : true,
        unique:true
    },

    address:{
        type :String
    },
    salary:{
        type:Number,
        required:true
    },

    username:{
        type :String,
        require:true
    },
    password :{
        type :String,
        require:true
    }
})
// create model
personSchema.pre('save',async function(next){
    const person = this;
    //check for is it old or modified
    if(!person.isModified('password')) return next();
    try{
        //salt hash generation
        const salt = await bcrypt.genSalt(10); //10 --->rounds

        //hash password gen == salt + password
        const hashedpassword = await bcrypt.hash(person.password,salt);
        
        //replace with person password with hash password
        person.password =hashedpassword;
        next();
    }
    catch(err){
            return next(err);
    }
})

personSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const ismatched = await bcrypt.compare(candidatePassword,this.password);
        return ismatched;
    }
    catch(err){
        throw err;
    }
}
const person = mongoose.model('person',personSchema);
module.exports=person;