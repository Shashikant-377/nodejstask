const { Todo } = require("../model");
const {httpMessage} = require("../constant")
exports.createTodo = async (req, res) => {
  try {
    const { categories, todo, place } = req.body;
    const createData = await Todo.create({
      categories,
      todo,
      userId: req.user.id,
      place,
      image: req.file.path
    });
    return res.json({
      statusCode: 201,
      message: httpMessage.TODO_CREATED,
      data: createData,
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const data = req.query;
    const query = { $and: [{ userId: req.user.id }, data] };
    const todoData = await Todo.find(query);

    return res.json({
      statusCode: 200,
      message: httpMessage.GET_TODO,
      data: todoData,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateData = await Todo.findOneAndUpdate(
      { id },
      { status },
      {new:true}
    );
    if(!updateData){
        return res.json({
            statusCode: 400,
            message: httpMessage.TODO_NOT_FOUND,
          });
    }
    return res.json({
      statusCode: 200,
      message:httpMessage.TODO_UPDATED_SUCCESSFULLY,
      data: updateData,
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.deleteTodod = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Todo.findOneAndUpdate(id);
    if(!deleteData){
        return res.json({
            statusCode: 400,
            message: httpMessage.TODO_NOT_FOUND,
          });
    }
    return res.json({
      statusCode: 200,
      message:httpMessage.TODO_DELETED_SUCCESSFULLY,
      data:deleteData
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Todo.findById(id);
    if(!deleteData){
        return res.json({
            statusCode: 400,
            message: httpMessage.TODO_NOT_FOUND,
          });
    }
    return res.json({
      statusCode: 200,
      message:httpMessage.TODO_DELETED_SUCCESSFULLY,
      data:deleteData
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

