const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUser, getOneUser, updateUser, deleteUser } = require('../controller/auth-controller')



// Toutes les routes


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all-user', getAllUser);
router.get('/all-one-user/:id', getOneUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser)

module.exports = router;