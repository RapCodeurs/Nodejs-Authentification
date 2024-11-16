require('dotenv').config();
const express= require('express');
const connectToBD = require('./database/db');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.route')

connectToBD();

//Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
  console.log(`Server lancé sur http://localhost:${PORT}`)
})