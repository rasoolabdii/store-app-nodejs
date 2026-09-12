const express = require("express");
const { mainRouterApi } = require("./mainRuotes");
const Controller = require("./Controller");
const SwaggerConfig = require("../config/swagger.config");
const cookieParser = require("cookie-parser");
const DB = require("./../config/database.config");

class Application extends Controller {
    #app = express();
    #PORT = process.env.PORT || 5000;
    constructor() {
        super();
        this.configServer();
        this.configRoutes();
        this.createServer();
    }

    configServer() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        // DB();
        require("./../config/database.config");
        this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY))
        SwaggerConfig(this.#app);
    }

    configRoutes() {
        this.#app.use("/api" , mainRouterApi)
    }

    createServer() {
        this.#app.listen(this.#PORT , () => {
            console.log(`Server is running http://localhost:${this.#PORT}`)
        })
    }
}

module.exports = Application;