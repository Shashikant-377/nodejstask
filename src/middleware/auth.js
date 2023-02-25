require("dotenv").config()
const { verify } = require("jsonwebtoken")
const multer = require("multer")
const { User } = require("../model")
const path = require("path")
const {httpMessage} = require("../constant")
exports.authMiddleware = async (req,res,next)=>{
try{
    const token = req.headers.authorization
    const jwtSecret = process.env.SECRET
if(!token){
    return res.json({
        statusCode:400,
        message:httpMessage.UNAUTHORIZED
    }) 
}
const realToken  =  token.split(" ")[1]
const data = await verify(realToken,jwtSecret )
const userData = await User.findById(data.id)
if(!userData){
    return res.json({
        statusCode:400,
        message:httpMessage.UNAUTHORIZED
    }) 
}
req.user = userData
next()
}catch(err){
    return res.json({
        statusCode:500,
        message:err.message
    })
}
}

exports.fileAndBodyAccept = (req, res, next) => {
    const storage = multer.diskStorage({
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
      },
    });
    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          // cb(null, false);
          // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          res.json({
            success: false,
            message:
              '!.......... wrong file upload....... only png , jpg , jpeg file is accepted',
          });
        }
      },
      limits: { fileSize: 1024 * 1024 },
    }).single('image');
    upload(req, res, (e) => {
      if (e) {
        return res.json({
          success: false,
          data: e.message,
        });
      }
    //   req.files = req.file || req.files;
    //   req.body = req.body; 
      next();
    });
  };
  
