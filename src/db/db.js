const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/todo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((data)=>{
  console.log("database connected");
}).catch((e)=>{
    console.log(e);
console.log("database not connected");
})

