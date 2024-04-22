const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.PORT);
const Router = require("./routes/api.router");
class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8088;
  }

  init() {
    this.addMiddlewareRoutes(this.app);
    this.listenToPort(this.app, this.port);
  }

  addMiddlewareRoutes(app) {
    app.use(
      express.json(
        { limit: "50mb", type: "application/json" },
        express.urlencoded({
          limit: "50mb",
          urlencoded: false,
        })
      )
    );

    app.use(cors());

    app.use(helmet());

    app.use("api/v1/", new Router().getRouters());

    app.use("*", (req, res) => {
        return res.status(404).json({
            code : 404,
            message : "Nott found"
        })
    })

    app.use((err, req, res, next) => {
        return res.status(err.code || 500).json({
            code : err.code || 500,
            message : err.message || "Internal server error"
        })
    })
  }

  listenToPort(app, port){
    app.listen( port, () => {
        console.log(`Server is running at port : ${port}`);
    })
  }
}

module.exports = new App();
