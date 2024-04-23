const { response } = require("express");
const db = require("../config/db.connection");
const { User } = db.models;
const UserValidation = require("../validation/user.validation");

class UserController {
  createPost = async (req, res, next) => {
    try {
      const { error, value } = await UserValidation.register(req.body);

      if (error)
        return res.status(400).json({
          code: 400,
          message: error.message,
        });

      const user = await User.findOne({
        where: { email: value.email },
        include: [{ model: UserMeta, as: "userMeta" }],
      });

    } catch (e) {
      return res.status(400).json({ code: 400, message: e.message });
    }
  };

  findAllUser = async (req, res) => {
    try {
      let { limit, page } = req.query;

      console.log(req.query);

      limit = +limit || 10;

      page = +page || 1;

      const skip = (limit - 1) * page;

      console.log(skip);

      const users = await User.findAll({limit, offset : page});

      if (!users.length)
        return res
          .status(200)
          .json({ code: 404, message: "Users not found!", data: [] });

          return res.status(200).json({
            code : 200,
            message : "User results fetch successfully",
            data : users
          })

          
    } catch (e) {
      console.log(e)
      return res.status(400).json({ code: 400, message: e.message });
    }
  };
}

module.exports = new UserController();
