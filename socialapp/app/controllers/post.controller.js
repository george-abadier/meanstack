const multer = require('multer')
const { unlink } = require('fs')
const helper = require('../helpers')
const { upload } = require('../middleWare')
const postModel = require('../../db/models/post.model')
class Post {
    static addPost = async (req, res) => {
        try {
            if (req.params.type == "file") {
                const uploadThisImage = upload.single('postfile')
                uploadThisImage(req, res, async function (e) {
                    if (e instanceof multer.MulterError)
                        helper.formatMyRes(res, 500, false, e, e.message + 'its a multer error')
                    else if (e) {
                        helper.formatMyRes(res, 500, false, e, e.message )
                    }
                    else {
                        try {
                            const post = postModel({ file: req.file.path, userid: req.user._id, type: req.params.type })
                            const result = await post.save()
                            helper.formatMyRes(res, 200, true, { file: req.file, result }, 'your post added successfully')
                        }
                        catch (e) {
                            helper.formatMyRes(res, 500, false, e, e.message )
                        }
                    }
                })
            } else {
                const post = postModel({ userid: req.user._id, ...req.body })
                const result = await post.save()
                helper.formatMyRes(res, 200, true, result, 'your post added successfully')
            }
        }
        catch (e) {
            console.log(e)
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
    static myPosts = async (req, res) => {
        try {
            await req.user.populate('myposts')
            helper.formatMyRes(res, 200, true, req.user.myposts, 'here are your posts ')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
    static getAll = async (req, res) => {
        try {
            const posts = await postModel.find()
            posts.forEach((post, i) => {
                if (post.userid == req.user.id) {
                    posts[i]._doc.ismine = true
                } else {
                    posts[i]._doc.ismine = false
                }
            })
            helper.formatMyRes(res, 200, true, posts, 'here are all posts ')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
    static getSingle = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id)
            helper.formatMyRes(res, 200, true, post, 'here are the post you asked ')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
    static deleteAllMine = async (req, res) => {
        try {
            const posts = await postModel.find({ userid: req.user._id })
            posts.forEach(async (post) => {
                if (post.type == 'file') await unlink(post.file, (e) => {
                    if (e) throw new Error('somthing go worng while deleting files')
                })
            })
            const result = await postModel.deleteMany({ userid: req.user._id })
            helper.formatMyRes(res, 200, true, result, 'deleted successfully ')
        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
    static deleteSingle = async (req, res) => {
        try {
            const result = await postModel.findOneAndDelete({ userid: req.user._id, _id: req.params.id })
            if(!result) throw new Error('you don`t have such post')
            if(result.type=='file'){
                await unlink(result.file,(e)=>{
                if (e) throw new Error('somthing go worng while deleting file please delete it manually')
            })}
            helper.formatMyRes(res, 200, true, result, 'deleted successfully ')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message )
        }
    }
}
module.exports = Post