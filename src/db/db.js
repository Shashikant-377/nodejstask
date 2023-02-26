const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(`${process.env.MONGO_URL}`,
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

