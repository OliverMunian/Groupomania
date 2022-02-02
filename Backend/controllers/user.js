const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../Models')
const { Sequelize }  = require('sequelize');

const User = db.user
const Commentaire =  db.commentaire
const Post = db.post

exports.signup = (req, res, next) => {
  console.log('signup', req.body)
  bcrypt.hash(req.body.password, 10)
    // Création de l'user
    .then(hash =>{
      console.log(hash)
      const user = User.create({
        email: req.body.email,
        password: hash,
        prenom: req.body.prenom,
        nom: req.body.nom
      })
      .then(() => { 
        res.status(201).json({ message: 'Utilisateur créé !'})
      })
      .catch(err => {
        console.log(error)
        res.status(400).json({ error: 'ERREUR SIGNUP' })
      })
    })
    .catch(error =>{
      console.log(error)
      res.status(500).json({ error: 'ERROR BCRYPT' })
    })
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email }})
    .then(user => {
      if(!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          else{
            res.status(200).json({
              userId: user.id,
              prenom: user.prenom,
              nom: user.nom,
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ),
              isAdmin: user.isAdmin
            });
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modify = (req, res, next) => {
  User.findOne({ where:{id: req.user.userId}})
    .then(user=>{
      user.nom = req.body.nom
      user.prenom = req.body.prenom
      user.save()
      .then(result =>{
        res.status(200).json({message: 'utilisateur modifié'})
      }).catch(error => {
        console.log(error)
        res.status(400).json({ error })
      })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error })
    })
}


// exports.modifyUser = (req, res, next) => {
//   console.log('ici')
//   const id = req.params.id
//   console.log(id)
//   User.findOne({where:{id: id}})
//   .then(user => {
//       if (userId === !user.id){
//       console.log(userId)
//         res.status(400).json({ error: "Impossible de modifier l'utilisateur" })
//       } else {
//         user.update().then(user => res.status(200).json({ user }))
//       }
//     })
//   .catch(error => {
//       console.log(error)
//       res.status(400).json({ error })})
// };

exports.remove = (req, res, next) => {
  Commentaire.destroy({where:{userId: req.user.userId }})
    .then(()=>{
      Post.destroy({where:{userId: req.user.userId }})
        .then(()=>{
          User.destroy({ where:{id: req.user.userId}})
          .then(()=>{ 
            res.status(200).json({message: "l'utilisateur a été supprimé"})
          }).catch(err => {
            console.log('erreur 2')
            console.log(err)
            res.status(401).json({error: err})
          })
        }).catch(err => {//fermeture catch Postdestroy
          console.log('erreur 1')
          console.log(err)
          res.status(401).json({error: err})
        })
    }).catch(err =>{
      console.log('erreur 3')
      console.log(err)
      res.status(401).json({error: err})
    })

}