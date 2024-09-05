require('dotenv').config()
const express = require('express')
const app = express()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI

app.set('view engine', 'ejs')
app.use(express.static('./public/'))

console.log(uri);

console.log("hello node server!!!");

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

app.get('/mongo', async (req, res)=>{

  console.log('in /mongo');
  //await
  await client.connect();
  console.log('conected?')
  // Send a ping to confirm a successful connection
  let result = await client.db("mackenzies-db").collection("cool-collection").find({}).toArray();
  console.log(result);

  res.render('mongo', {
    mongoResult : result
  });
})

app.get('/', function (req, res) {
  // res.send('Hello World from local devbox :)')
  res.sendFile("index.html");
  
})

app.get('/ejs', (res, req)=>{

  res.render('index', {
    myServerVariable : "something from server"
  });
})

app.listen(5000)