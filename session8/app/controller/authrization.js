const jsonwebToken=require('jasonwebtoken')
const helper=require('../helper')
const userModel=require('../../db/models/user.model')
const auth=async (req,res,next)=>{
try{
const token=req.header('authToken')
token.replace('bearer ','')
const id=jsonwebToken.verify(token,"hammada")
const userData= await userModel.findOne({
    _id:id,
    "tokens.token":token
})
if(userData){
   req.user=userData 
   req.token=token
   next()
}else{
    throw new Error('your token isnnot valid')
}
}
catch(e){
    myHelper.resHandler(res, 500, false, e, e.message)
}
}