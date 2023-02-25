const Joi = require('joi')   
exports.todoValidation = (req, res, next)=>{
    const {body  } = req
    const validateTodo = ()=>{
        const schema = Joi.object({
            categories:Joi.string().required().valid("personal", "business", "office",),
            todo:Joi.string().required(),
            place:Joi.string().required(),
            image:Joi.string()
        })
        return schema
    }
    const {error, value} =  validateTodo().validate(body)

    // const {error, value} = schema.validate(body); 
   if(error){
       return res.json({
           message:error.details[0].message.replace(/[^\w\s]/gi, '')
       })
    }else{
       next()
   }

}
exports.todoUpdateValidation = (req, res, next)=>{
    const {body  } = req
    const validateTodo = ()=>{
        const schema = Joi.object({
            status:Joi.string().required().valid("Done")
        })
        return schema
    }
    const {error, value} =  validateTodo().validate(body)

    // const {error, value} = schema.validate(body); 
   if(error){
       return res.json({
           message:error.details[0].message.replace(/[^\w\s]/gi, '')
       })
    }else{
       next()
   }

}