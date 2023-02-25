const express = require("express")
const userRouter = express.Router()
const {userController} = require("../controller")
const {routeConstant:{USER}} = require("../constant")
const {userValidation} = require("../validation/userValidation")
userRouter.post(USER.SIGNUP,userValidation , userController.signup)
userRouter.post(USER.LOGIN, userController.login)

module.exports = {
    userRouter
}