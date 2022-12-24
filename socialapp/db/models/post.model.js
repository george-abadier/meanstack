const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
    userid: {
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'users'
    },
    type: {
        type: String,
        required: true,
        enum: ['txt', 'file'],
        trim: true,
        lowercase: true
    },
    content: {
        type: String,
        required: function type() {
            return (this.type == 'txt')
        }
    },
    file: {
        type: String,
        required: function type() {
            return (this.type == 'file')
        }
    }
}
)
const post=mongoose.model('posts',PostSchema)
module.exports=post