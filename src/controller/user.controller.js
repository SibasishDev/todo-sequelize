const { response } = require("express");
const db = require("../config/db.connection");
const { User } = db;
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

      limit = limit || 10;

      page = page || 1;

      const skip = (limit - 1) * page;

      const users = await User.findAll({ limit, offset: skip });

      if (!users.length)
        return res
          .status(200)
          .json({ code: 404, message: "Users not found!", data: [] });
    } catch (e) {
      return res.status(400).json({ code: 400, message: e.message });
    }
  };
}
