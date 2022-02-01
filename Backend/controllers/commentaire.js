const { Sequelize }  = require('sequelize')
const db = require('../Models');
const user = require('../Models/user');
const User = db.user
const Commentaire = db.commentaire

//Créer un commentaire
exports.createCommentaire= (req, res, next) => {
    console.log('hello')
    User.findByPk(req.user.userId).then(user=>{
        const commentaire = new Commentaire({
            userId: req.user.userId,
            prenom: user.prenom,
            nom: user.nom,
            postId: req.params.id,
            message : req.body.message
        });
        commentaire.save()
            .then(()=> res.status(201).json({message: 'le commentaire a bien été crée!'}))
            .catch(error => res.status(400).json({ error: 'le commentaire n\'a pu être crée!'}))
    }).catch(error => 
        res.status(400).json({ error: 'erreur recuperation utilisateur' 
    }))
};

//Récuperer tous les commentaires d'un post
exports.findCommentaireByPost = (req, res, next) => {
    Commentaire.findAll({where:{postId: req.params.id}})
    .then((result)=> res.status(200).json(result))
    .catch(error => res.status(404).json({error}))
};

// //Modifier un commentaire
// exports.modifyCommentaire = (req, res, next) => { 
//     Commentaire.update({ ...req.body }, {...req.body, _id: req.params.id} )
//     .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
//     .catch(error => res.status(400).json({ error }))
// }

//Supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
    Commentaire.findOne({where:{id: req.params.id}}).then(() =>
    Commentaire.destroy({ 
        where:{id: req.params.id }
    }))
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch(error => res.status(400).json({ error }))
}