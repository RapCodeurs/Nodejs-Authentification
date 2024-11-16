
// Middleware pour verifier si c'est un admin 

const isAdminUser = (req, res, next)=> {

  if(req.userInfo.role !== 'admin'){
    return res.status(402).json({
        succes: false,
        message: "Acces refusé, 😔il n'est pas un administrateur"
    })
  }
  next()
};

module.exports = isAdminUser;