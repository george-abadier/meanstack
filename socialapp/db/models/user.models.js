const mongoose=require('mongoose')
const validator=require('validator')
const bcrybt=require("bcryptjs")
const jsonWebToken=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    fName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
        lowercase:true,
    },
    lName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
        lowercase:true,
    },
    age:{
        type:Number,
        min:18,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email address')
            }
        }
    },
    status:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },
    gender:{
        type:String,
        enum:["male","female"],
        trim:true,
        lowercase:true,
        required:true
    },
    dateOfBirth:{
        type:Date,

    },
    phoneNums:[{
        number:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
            }
        },
        type:{
            type:String,
            enum:['home','work','personal'],
            trim:true,
            lowercase:true
        }
    }],
    addresses:[{
        type:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        address:{
            type:String,
            trim:true,
            lowercase:true,
            required:true
        }
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},
{
   timestramps:true
})
userSchema.pre('save',function(){
   if(this.isModified('password')) this.password=bcrybt.hashSync(this.password )
})
userSchema.statics.logIn=async(email,enterdPassword)=>{
    const userData=await user.findOne({email})
    if(!userData){
        throw new Error('invalid email')
    }
    if(!bcrybt.compareSync(enterdPassword,userData.password)){
        throw new Error('invalid password')
    }
    return userData
}
userSchema.methods.creatToken=async function(){
const token=await jsonWebToken.sign({_id:this._id},process.env.tokenPass)
this.tokens.push({token})
await this.save()
return token
}
userSchema.methods.toJSON=function(){
    const userObject=this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
userSchema.virtual('myposts',{
    ref:'posts',
    localField:"_id",
    foreignField:"userid"
})
const user=mongoose.model('users',userSchema)
module.exports=user