const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { disconnect } = require('mongoose');

//register controller


const registerUser = async(req, res) => {

  try{

    // extraction des informations de l'utilisateur
    const {username, email, password, role} = req.body;

    // Verifier si l'utilisateur existe deja dans la base de données
    const checkExistUser = await User.findOne({$or: [{username}, {email}]});

    if (checkExistUser){
      return res.status(400).json({
        succes: false,
        message: "L'utilisateur existe déjà 😊, svp essayez avec un autre utilisateur",
      })
    }

    // S'il n'existe pas faut le créer
    // Mais faut cripter le mot de passe, genSalt: le nombre de caractere

    const salt = await bcrypt.genSalt(10);
    //Ensuite le hashé dans la base de données
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create et enregister l'utilisateur
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role : role || 'user'
    })

    await newlyCreatedUser.save();

    if (newlyCreatedUser){
      return res.status(200).json({
        succes: true,
        message: "L'utilisateur a bien été crée 🤩 et enregistré dans la base de données"
      })
    } else {
      return res.status(401).json({
        succes: false,
        message: "L'utilisateur ne peut crée désolé 😌"
      })
    }


  }catch(e){
    console.log(e);
    res.status(500).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
  
}

// login controller

const loginUser = async(req, res) => {
  
  try{
    // Recuperation des infos de l'utilisateur
    const {username, password} = req.body;

    //Recherche if the user exite dans la base de données
    const user = await User.findOne({username});

    if(!user){
      return res.status(402).json({
        succes: false,
        message: "L'tilisateur n'existe pas 😞"
      })
    }

    // verifier si le mot de passe est correct

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
      return res.status(402).json({
        succes: false,
        message: 'utilisateur ou mot de passe invalide'
      })
    }

    // on cree un token pour utilisateur
    const accessToken = jwt.sign({
      userId : user._id,
      username: user.username,
      role: user.role
    }, process.env.JWT_SECRET_KEY,{
      expiresIn: "10m"
    })

    res.status(200).json({
      succes: true,
      message: "Token a bien été crée 🤩",
      accessToken
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
}

// get all users

const getAllUser = async(req, res) => {
  try {
    // Récupératoion des informations d'utilisateur
    const userId = req.body;
    // recherche de tous les utilisateurs
    const user = await User.find(userId);

    //console.log(user)

    if(!user){
      return res.status(500).json({
        succes: false,
        message: "Les utilisateurs n'existent pas dans la base de données 😌"
      })
    }
    
    res.status(200).json({
      succes: true,
      message: `Requetes abouties avec succes, 😊 voici tous les utilisateurs : ${user.length}`,
      data: user
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
}

// get a user
const getOneUser = async(req, res) => {
  try {
    // Recuperation de l'id de l'utilisateur
    const {id} = req.params;

    // Récuperation de l'utilisateur grace à son ID
    const userId = await User.findById(id);

    if(!userId){
      return res.status(500).json({
        succes: false,
        message: "L'id que vous avez demandée n'existe pas 😌"
      })
    }

    res.status(200).json({
      succes: true,
      message: "Id aboutie avec succes, 😊 voici l'utilisateur",
      data: userId
    })

    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
}

// update user

const updateUser = async(req, res) => {
  try {
    
    // Recuperation de l'id de l'utilisateur
    const {id} = req.params;
    const {username, email, role} = req.body;

    // Récuperation de l'utilisateur grace à son ID et le modifier
    const userId = await User.findByIdAndUpdate(id, {
      username,
      email,
      role
    }, {new : true});

    if(!userId){
      return res.status(500).json({
        succes: false,
        message: "L'id que vous avez demandée n'existe pas 😌"
      })
    }

    res.status(200).json({
      succes: true,
      message: "Utilisateur modifié avec succes, 😊 voici l'utilisateur",
      data: userId
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
}

// delete user

const deleteUser = async(req, res) => {
  try {
    // Recuperation de l'id de l'utilisateur
    const {id} = req.params;

    const userId = await User.findByIdAndDelete(id);

    if(!userId){
      return res.status(500).json({
        succes: false,
        message: "L'id que vous voulez supprimer n'existe pas 😌"
      })
    }

    res.status(200).json({
      succes: true,
      message: "Utilisateur supprimé avec succes, 😊 voici l'utilisateur"
    })


  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      message: 'Erreur avec la base de données'
    })
  }
}

module.exports = {registerUser, loginUser, getAllUser, getOneUser, updateUser, deleteUser}