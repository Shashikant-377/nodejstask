const express = require("express")
const app = express()
const port = 8000
const {router} = require("./router")
require("./db/db")
require("dotenv").config()


app.use(express.json())


app.use("/api/",router)

app.listen(port, ()=>{
    console.log(`server live at ${port}`);
})