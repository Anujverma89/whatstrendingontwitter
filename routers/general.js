const express = require("express")
const generalRouter = express.Router();
const scrapper = require("../src/twitter");
const {insertIntoDb,fetchfromDatabase} = require("../models/db");

generalRouter.get("/",async(req,res)=>{
    try{
      let trending = await scrapper();
      insertIntoDb(trending);
      let result = await fetchfromDatabase(trending.uid);
      res.render("index",{"trends":result});
    }catch(e){
      console.log(e)
      res.send("UMMM There's something wrong");
    }
})



module.exports = generalRouter;