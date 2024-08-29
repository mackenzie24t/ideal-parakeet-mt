const express = require('express')
const app = express()
app.use(express.static('./public/'))

console.log("hello node server!!!");

app.get('/', function (req, res) {
  // res.send('Hello World from local devbox :)')
  res.sendFile("index.html");
  
})

app.listen(5000)