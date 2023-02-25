const express = require("express")
const {todoController} = require("../controller")
const  { authMiddleware,fileAndBodyAccept} = require("../middleware/auth")
const {todoValidation,todoUpdateValidation } = require("../validation/todoValidation")
const {routeConstant:{TODO}} = require("../constant")
const todoRouter = express.Router()

todoRouter.route(TODO.ALL)
.post(authMiddleware,fileAndBodyAccept, todoValidation , todoController.createTodo)
.get(authMiddleware , todoController.getTodo)
todoRouter.route(TODO.BY_ID)
.put(authMiddleware ,todoUpdateValidation, todoController.updateTodo)
.patch(authMiddleware , todoController.deleteTodod)
.get(authMiddleware, todoController.getTodoById)


module.exports = {
    todoRouter
}