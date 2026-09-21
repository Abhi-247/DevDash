const express=require("express");
const { signup, login, logout, googleAuth } = require("../controllers/UserAuthController");
const UserAuthRouter=express.Router()

UserAuthRouter.post("/signup",signup)
UserAuthRouter.post("/login",login)
UserAuthRouter.post("/logout",logout)
UserAuthRouter.post("/google-auth", googleAuth);

module.exports=UserAuthRouter;

