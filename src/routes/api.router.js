const Router = require("express");

class ApiRouter {
    constructor () {
        this.router = Router();
        this.init();
    }

    init(){
        // this.router.post("/create-post", );
    }

    getRouters(){
        return this.router;
    }
}

module.exports = ApiRouter;