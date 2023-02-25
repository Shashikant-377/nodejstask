const Joi = require('joi')   
exports.userValidation = (req, res, next)=>{
    const {body  } = req
    const validateUser = ()=>{
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })
        return schema
    }
    const {error, value} =  validateUser().validate(body)

    // const {error, value} = schema.validate(body); 
   if(error){
       return res.json({
           message:error.details[0].message.replace(/[^\w\s]/gi, '')
       })
    }else{
       next()
   }

}