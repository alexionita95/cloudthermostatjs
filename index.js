const express = require('express')
var bodyParser = require('body-parser')
 
 
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
const port =process.env.PORT || 3000
var collection;
app.get('/', (req, res) => {
    var data = "";
    if(client.isConnected())
    {
        data+="Connected to db!<br>"
    }
    data +='Hello World!'
  res.send(data)
})
app.post('/data',(req,res)=>{

    collection.insertOne(req.body);
    var data = req.body;
    
    data.timestamp = Date.now();
    console.log(data);
    res.send(data);
    console.log("Data received from device");

});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thermostatjs:1234567890@cluster0.aglo6.mongodb.net/thermostatjs?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  collection = client.db("thermostatjs").collection("device_data");
  console.log("Connected");
  // perform actions on the collection object

});
app.listen(port, () => {
  console.log(`Example app listening at http://192.168.1.222:${port}`)
})