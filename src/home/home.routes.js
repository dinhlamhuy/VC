const express = require("express");
const homeRouter = express.Router();

const homeController = require("./home.controllers");

// authRouter.post("/register",authController.register);
homeRouter.post("/login", homeController.login);
homeRouter.get("/getuser", homeController.GetUser);
homeRouter.post("/updatetoken", homeController.updateToken);

module.exports = homeRouter;
