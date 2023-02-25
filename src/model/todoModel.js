const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    categories: {
      type: String,
      trim: true,
      enum: ["personal", "business", "office",]
    },
    image:{
      type:String,
      trim:true
    },
    todo:{
      type:String,
      trim:true
    },
    place:{
      type:String,
      trim:true
    },
    status:{
      type: String,
      trim: true,
      enum: [ "Done", "Active",],
      default:"Active"
    },
    userId: {
      type: String,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
