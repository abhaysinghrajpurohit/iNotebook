require('dotenv').config()
const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const PORT = process.env.PORT||5000;


app.use(cors())
//Middleware inorder to use req.body
app.use(express.json())

//Available Routes:

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Success server started!')
})

app.listen(PORT)
