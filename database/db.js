const mongoose = require('mongoose');


const connectToBD = async() => {
  try {
    
    await mongoose.connect(process.env.MOMGO_URL)
    console.log('La base de données est bien connectée')

  } catch (error) {
    console.log('La connexion a echoué', error);
    process.exit(1);
  }
}


module.exports = connectToBD;