const express = require("express")
require("dotenv").config()
const path = require("path")
const bodyParser = require("body-parser")
const generalRouter = require("./routers/general")
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))

// settingup router 
app.use("/",generalRouter);

app.listen(process.env.port, ()=>{
    console.log(`app listening on port ${process.env.port}`)
})