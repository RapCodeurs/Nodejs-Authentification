const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUser, getOneUser, updateUser, deleteUser } = require('../controller/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware.');



// Toutes les routes


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all-user', getAllUser);
router.get('/all-one-user/:id', getOneUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

router.get('/welcome', authMiddleware, (req, res)=>{

  const {username, userId, role} = req.userInfo;

  res.json({
    succes: true,
    message: 'Welcome to the home page',
    user: {
      _id: userId,
      username: username,
      role: role
    }
  })
});

router.get('/bienvenue', authMiddleware, isAdminUser, (req, res)=>{
  res.status(200).json({
    succes: true,
    message: "Bienvenue, 😊 vous etes connectés en tant qu'administrateur"
  })
})

module.exports = router;