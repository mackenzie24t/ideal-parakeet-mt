require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://macthompson2002:${process.env.MONGO_PWD}@cluster0.4x7x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

console.log(uri);

console.log('im on a node server change that and that');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// function whateverNameOfIt (params) {}
// ()=>{}

app.get('/', function (req, res) {
  // res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.ejs');
})

app.get('/ejs', (req,res)=>{

  res.render('index', {
    myServerVariable : "something from server"
  });

  //can you get content from client...to console? 
})

app.get('/read', async (req,res)=>{

  console.log('in /read');
  await client.connect();
  
  console.log('connected?');
  // Send a ping to confirm a successful connection
  
  let result = await client.db("sandwich").collection("ingredient")
    .find({}).toArray(); 
  console.log(result); 

  res.render('read', {
    postData : result
  });

});

app.post('/insert', async (req,res)=> {

  console.log('in /insert');
  console.log('request', req.body);
  // console.log('request', req.id);
  console.log('request', req.body.bread);

  //connect to db,
  await client.connect();
  //point to the collection 
  await client.db("sandwich").collection("ingredient").insertOne({ bread: req.body});
  // await client.db("mackenzies-db").collection("cool-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
  //insert into it
  // res.redirect('/read');

}); 

app.post('/update/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("mackenzies-db").collection("cool-collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
  )
  .then(result => {
    console.log(result); 
    res.redirect('/read');
  });
 
  //insert into it
 


});

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});