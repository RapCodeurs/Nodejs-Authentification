const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  
  // Recuperation du token
  const authHerder = req.headers["authorization"];
  const token = authHerder && authHerder.split(' ')[1];
  //console.log(token)

  // Vérification du token
  if(!token){
    return res.status(402).json({
      succes: false,
      message: "Acces refusé, Le token n'est pas valide 😌"
    })
  }

  // decoder le token
  try {

    const decoderToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decoderToken);

    req.userInfo = decoderToken;
    next();
    
  } catch (e) {
    return res.status(500).json({
      succes: false,
      message: "Acces refusé, Le token n'est pas valide 😌"
    })
  }
}

module.exports = authMiddleware;