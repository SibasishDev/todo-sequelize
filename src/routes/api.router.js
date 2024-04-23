const Router = require("express");
const userController = require("../controller/user.controller");
const {authenticateAccessToken} = require("../middleware/auth.middleware")

class ApiRouter {
    constructor () {
        this.router = Router();
        this.init();
    }

    init(){
        // this.router.use(authenticateAccessToken);
        this.router.get("/get-user", userController.findAllUser);
    }

    getRouters(){
        return this.router;
    }
}

module.exports = ApiRouter;