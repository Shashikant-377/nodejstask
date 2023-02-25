const{ User } = require("../model")
const { hash, genSalt, compare } = require("bcrypt")
const { sign} = require("jsonwebtoken")
require("dotenv").config()
const {httpMessage} = require("../constant")
exports.signup = async (req, res)=>{
try{
const { email, password, name} = req.body
const userData = await User.findOne({email:email})
if(userData){
    return res.json({
        statusCode:400,
        messsage:httpMessage.USER_EXIST
    })  
}
const salt = await genSalt(10)
const hashPassword = await hash(password, salt)
 await User.create({
    email,name, password:hashPassword
})
return res.json({
    statusCode:201,
    messsage:httpMessage.USER_SIGNUP,
})  
}catch(err){
return res.json({
    statusCode:500,
    messsage:err.message
})
}
}


exports.login = async (req, res)=>{
    try{
    const { email, password} = req.body
    const jwtSecret = process.env.SECRET
    const userData = await User.findOne({email:email})
    
    if(!userData){
        return res.json({
            statusCode:400,
            messsage:httpMessage.INVALID_CREDENTIAL
        })  
    }
    const comparePassword = await compare(password, userData.password)
    if(!comparePassword){
        return res.json({
            statusCode:400,
            messsage:httpMessage.INVALID_CREDENTIAL
        })  
    } 

    const token = await sign({id:userData._id},jwtSecret, {expiresIn:"1d"} )
    
    return res.json({
        statusCode:400,
        messsage:httpMessage.USER_LOGIN,
        data:token
    }) 
    
    }catch(err){
    return res.json({
        statusCode:500,
        messsage:err.message
    })
    }
    }
    