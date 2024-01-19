import express from "express";
import axios from "axios";
import { passwordStrength } from 'check-password-strength';

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render("index.ejs");
})
  
app.post('/', async(req, res)=>{
    var params = {
        'upper': req.body.upper ? req.body.upper : "off",
        'lower': req.body.lower ? req.body.lower : "off",
        'numbers': req.body.numbers ? req.body.numbers : "off",
        'special': req.body.special ? req.body.special : "off",
        'length': req.body.length,
        'repeat': 1,
    }
    try{
        const response = await axios.get("https://passwordwolf.com/api/", {params : params});
        const pass = response.data[0].password
        const stren = passwordStrength(pass).id
        res.render("index.ejs", {password: pass, strength: stren})
    } catch(error){
        console.error("Failed to make request:", error.message);
    }
})
app.listen(3000)