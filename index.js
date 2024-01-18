import express from "express";
import axios from "axios";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render("index.ejs");
})
  
app.listen(3000)