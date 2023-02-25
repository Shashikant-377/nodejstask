const express = require("express")
const router = express.Router()
const {todoRouter } = require("./todoRouter")
const {userRouter} = require("./user.router")
const {routeConstant:{USER, TODO}} = require("../constant")

router.use(TODO.DEFAULT,todoRouter)
router.use(USER.DEFAULT, userRouter)

module.exports ={
    router
}