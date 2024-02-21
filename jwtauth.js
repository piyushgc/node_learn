const jwt  = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token not found'});
    //extract the jwt form header req
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    try{
        //Verify token jwt
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        //attach user info to the request
        req.user = decoded;
        next();

    }
    catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid Token'});
    }
}
const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}
module.exports = {jwtAuthMiddleware,generateToken};