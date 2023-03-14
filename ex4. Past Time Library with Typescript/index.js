require("dotenv").config();

const express = require('express')
const fs = require('fs')
const app = express()
const { KhmerDate } = require('./src/asset/js/KhmerDate')

app.use(express.json())
app.get('/asset', (req, res) => {
  // console.log(req.query['assetPath']);
  if (fs.existsSync(`./src/asset/${req.query['assetPath']}`)) {
    res.sendFile(req.query['assetPath'], { root: './src/asset/' })
  } else {
    res.send("<h1>File Not found</h1>")
  }
})

app.post('/getPastTime', (req, res) => {
  const { date } = req.body
  const pastDate = new KhmerDate(new Date(date))
  res.json({
    msg: pastDate.getLabel()
  })
})


app.get('/', (req, res) => {
  res.sendFile('src/Template/index.html', { root: './' })
})

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server run on http://localhost:${process.env.PORT ?? 3000}`);
})