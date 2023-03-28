const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
var checkLogin = require("./routes/checkLogin")
var register = require("./routes/register")

const port = 3000
app.use(express.json())

app.use('/login', checkLogin)
app.use('/register', register)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})