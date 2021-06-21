const express = require('express')
 
 
const app = express()
app.set('view engine', 'ejs');
const port =process.env.PORT || 3000
var collection;


function timeConverter(t) {     
  var a = new Date(t);
  var today = new Date();
  var yesterday = new Date(Date.now() - 86400000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
      return 'today, ' + hour + ':' + min + ':' + sec;
  else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
      return 'yesterday, ' + hour + ':' + min + ':' + sec;
  else if (year == today.getFullYear())
      return date + ' ' + month + ', ' + hour + ':' + min + ':' + sec;
  else
      return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec;
}

app.get('/', (req, res) => {
    var htmlData = "";
    if(client.isConnected())
    {
        collection.findOne(
            {},
            { sort: { _id: -1 } },
            (err, data) => {
                var pageData = data;
                pageData.timestamp = timeConverter(data.timestamp);
                res.render("index",pageData);
               console.log(data);
            },
          );
    }
    else
    {
    htmlData += 'Hello World!'
     res.send(htmlData)
    }
})
app.get('/data', (req,res)=>{
  var htmlData = "";
  if(client.isConnected())
  {
      collection.findOne(
          {},
          { sort: { _id: -1 } },
          (err, data) => {
            res.type('json');
              res.send(data);
          },
        );
  }
  else
  {
  htmlData += 'Hello World!'
   res.send(htmlData)
  }
});
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