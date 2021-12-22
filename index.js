const express = require('express')
 
 
const app = express()
app.set('view engine', 'ejs');
app.use( express.static( "views" ) );
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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
  var hour =a.getHours() <=9?'0'+ a.getHours():a.getHours();
  var min = a.getMinutes() <=9?'0'+ a.getMinutes():a.getMinutes();
  var sec = a.getSeconds() <=9?'0'+ a.getSeconds():a.getSeconds();
  if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
      return 'Today, ' + hour + ':' + min + ':' + sec;
  else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
      return 'Yesterday, ' + hour + ':' + min + ':' + sec;
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
                console.log(Date.now() - data.timestamp)
                if(Date.now() - data.timestamp > 30000)
                {
                  pageData.online = false;
                }
                else
                {
                  pageData.online=true;
                }
                pageData.timestamp = timeConverter(data.timestamp);
                pageData.temperature = parseFloat(data.temperature).toFixed(1);
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
            var pageData = data;
            if(Date.now() - data.timestamp > 35000)
                {
                  pageData.online = false;
                }
                else
                {
                  pageData.online=true;
                }
                pageData.rawTimestamp = data.timestamp;
                pageData.timestamp = timeConverter(data.timestamp);
                pageData.rawTemperature = parseFloat(data.temperature);
                pageData.temperature = parseFloat(data.temperature).toFixed(1);
                
              res.send(pageData);
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