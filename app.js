const express = require("express")
const path = require('path')
const app = express();

const bodyparser = require('body-parser')
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}


const port = 3000;
const fs = require('fs')


//Define Moongose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
var Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//For Serving Static files
app.use(express.urlencoded())//Middleware to Save the get req in a file 
//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//Set the Template Engine as Pug
app.set('views' ,path.join(__dirname, 'views'))//Set the Views Directory
//ENDPOINTS
app.get('/',(req,res)=>{   
    res.status(200).render('home.pug')
})
app.get('/contact',(req,res)=>{
   
    res.status(200).render('contact.pug')
})


app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })

    //res.status(200).render('contact.pug')
})





//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})
