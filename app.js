const express = require('express')
const app = express()

console.log("hello node server!!!");

app.get('/', function (req, res) {
  // res.send('Hello World from local devbox :)')
  app.use(express.static('./'))
})

app.listen(5000)