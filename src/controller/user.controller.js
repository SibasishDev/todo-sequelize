
const { response } = require("express");
const db = require("../config/db.connection");
const {User} = db;
const UserValidation = require("../validation/user.validation");

class UserController {

    createPost = async (req, res, next) => {

        const {error, value} = await UserValidation.register(req.body);

        if(error) return res.status(400).json({
            code : 400,
            message : error.message
        });

        const user = await User.findOne({
            where : {email : value.email},
            include : [{model : UserMeta, as : "userMeta"}]
        });

        
    }
}