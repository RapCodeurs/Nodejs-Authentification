require('dotenv').config();
const express= require('express');
const connectToBD = require('./database/db');
const app = express();
const PORT = process.env.PORT || 3000;

connectToBD();

app.get('/', (req, res) => {
  res.send('Hello wordl')
})

app.listen(PORT, ()=>{
  console.log(`Server lancé sur http://localhost:${PORT}`)
})