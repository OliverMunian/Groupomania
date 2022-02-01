const { Sequelize }  = require('sequelize')
const db = require('../Models')
const Post = db.post
const User = db.user

exports.createPost = (req,res, next) => {
    const file = req.file
    const postObject = req.body
    const post = Post.build({
        ...postObject,
        userId: req.user.userId,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}`: req.body.imageUrl
    });
    console.log(post)
    console.log(file)
    post.save()
        .then(()=> res.status(201).json({message: 'le post a bien été crée!'}))
        .catch(error =>{ 
            console.log(error)
            res.status(400).json({ error:'le post n\'a pas été crée!'})
        });

};

exports.modifyPost = (req, res, next) => {
    console.log('ici')
    const postObject = req.file ?
    {
      message: req.body.message,
      imageUrl: `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}`
    } : { message: req.body.message };
    console.log(req.user)
    console.log(req.body)
    Post.findOne({where:{id: req.params.id, userId: req.user.userId}})
    .then(post => {
        if (!post) {
        console.log(post)
          res.status(400).json({ error: "Impossible de modifier le post" })
        } else {
          post.update(postObject).then(post => res.status(200).json({ post }))
        }
      })
    .catch(error => {
        console.log(error)
        res.status(400).json({ error })})
};


exports.deletePost = (req, res, next) => {
    Post.findOne({id: req.params.id})
    .then(() =>
        Post.destroy({
            where:{id: req.params.id }
        })
    )
    .then(()=> res.status(200).json({message : 'Objet supprimé'}))
    .catch(error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, next) => {
    console.log(req.params)
    Post.findOne({where:{id: req.params.id}})
    .then((result)=> res.status(200).json(result))
    .catch(error => res.status(404).json({error}))
};


exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: User
    })
    .then((result)=> res.status(200).json(result))
    .catch(error => res.status(400).json({error: 'impossible d\'afficher les posts'}));
};

exports.getAllMyPost = (req, res, next) => {
    console.log('user', req.user.userId)
    Post.findAll({where: {
        userId: req.user.userId,
    }})
    .then((result)=> res.status(200).json(result))
    .catch(error => res.status(400).json({error: 'impossible d\'afficher tous vos posts'}));
};
