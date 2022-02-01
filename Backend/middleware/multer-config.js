const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null,'images')
  },
  filename: function(req, file, callback){
    callback(null, Date.now() +  '-' + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 }
}).single('image');

module.exports = upload;

// exports.getFile= function(req,res){
//   res.download('/images' + req.params.path)
// }