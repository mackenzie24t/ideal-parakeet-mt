const express = require('express')
const app = express()

console.log("hello node server!!!");

app.get('/', function (req, res) {
  res.send('Hello World from local devbox :)')
})

app.listen(5000)