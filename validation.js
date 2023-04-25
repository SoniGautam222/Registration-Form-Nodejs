const joi=require('@hapi/joi');

// blueprint of the objects
const registerValidation = (data)=>{
const schema = joi.object({
    name: joi.string().min(2).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required()
})
    return schema.validate(data);

}

const loginValidation = (data)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).required()
    })
        // console.log(data);
        return schema.validate(data);
    
    }

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;