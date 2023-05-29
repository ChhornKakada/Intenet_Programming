const express = require('express');
const app = express();
const routes = require('./routes/usersRoutes');
const port = process.env.PORT || 3000;
var cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/usersModel');
const bodyParser = require('body-parser');


app.use(cors("*"))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tp9');
}

main().catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app uses routers "routes"
app.use('/user',routes)

// port
app.listen(port);

console.log('user list started on port: ' + port);