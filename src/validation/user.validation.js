const Joi = require("joi");

class UserValidation {
    register(data){
        const schema = Joi.object({
            email : Joi.string().email().min(4).max(100).required(),
            password : Joi.string().required(),
            confirmPassword : Joi.ref("password"),
            name : Joi.string().required()
        })
    }
}

module.exports = new UserValidation();