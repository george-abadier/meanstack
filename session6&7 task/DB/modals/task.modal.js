const mongoose=require('mongoose')
const Task=new mongoose.model("Tasks",{
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:20,
        unique:true
    },
    content:{
        type:String,
        trim:true,
        required:true
    },
    taskDeadLine:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:false
    }
})
module.exports=Task