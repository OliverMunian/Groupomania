const express = require('express');
const { response } = require('../app');
const router  = express.Router();

const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/commentaire')
const auth = require ('../middleware/auth')
const multer = require('../middleware/multer-config');

//Posts
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost)
router.get('/me', auth, postCtrl.getAllMyPost)
router.get('/:id',auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id',auth, postCtrl.deletePost)


//Commentaires

router.post('/:id/comment', auth, commentCtrl.createCommentaire)
router.get('/:id/comment', auth, commentCtrl.findCommentaireByPost)
router.delete("/:id/comment/:id", auth, commentCtrl.deleteCommentaire) // supprime le commentaire d'un post précis

module.exports =  router;