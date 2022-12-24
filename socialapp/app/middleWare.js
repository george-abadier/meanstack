const userModel = require('../db/models/user.models')
const jsonWebToken = require("jsonwebtoken")
const helper = require('./helpers')
const multer = require('multer')
const auth = async (req, res, next) => {
    const decoded = jsonWebToken.verify(req.header('Authorization'), process.env.tokenPass)
    const user = await userModel.findOne({
        _id: decoded._id,
        "tokens.token": req.header('Authorization')
    })
    if (!user) {
        helper.formatMyRes(res, 500, false, user, 'invalid token')
    } else {
        req.user = user
        req.token = req.header("Authorization")
        next()
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'statics/uploaded/')
    },
    filename: (req, file, cb) => {
        const myFileName = Date.now() + file.fieldname + file.originalname
        cb(null, myFileName)
    }
})
const upload = multer(
    {
        storage,
        fileFilter: (req,file,cb)=>{
            if(file.mimetype!='image/png'&&file.mimetype!='image/jpg'&&file.mimetype!='image/jpeg'){
                cb(null,false)
                cb(new Error('wrong file extention'))
            }
            cb(null,true)
        },
        limits:{fileSize:5000000}
    })

module.exports.auth = auth
module.exports.upload=upload