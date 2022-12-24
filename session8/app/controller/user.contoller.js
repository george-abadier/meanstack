const userModel = require("../../db/models/user.model")
const myHelper = require("../../app/helper")
class User{
    static register = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static login = async(req,res) => {
        try{

            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token =await userModel.generateToken()
            myHelper.resHandler(res, 200, true,{user:userData,token} , "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static changeStatus=async(req,res)=>{
        req.user.status=!req.user.status
        const userData=await req.user.save()
        myHelper.resHandler(res, 200, true,userData, "user status changed successfully")
    }
}
module.exports = User