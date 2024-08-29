const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public/'))

console.log("hello node server!!!");

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