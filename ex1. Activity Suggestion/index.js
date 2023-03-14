
const express = require('express')
const fs = require('fs')
const app = express()

app.get('/src', (req, res) => {
  if (fs.existsSync(`./src/${req.query['srcFile']}`)) {
    res.sendFile(req.query['srcFile'], { root: './src/' })
  } else {
    res.send("<h1>File Not found</h1>")
  }
})

app.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: './' })
}).listen(701);