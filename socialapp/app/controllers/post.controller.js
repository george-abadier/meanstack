const multer=require('multer')
const helper = require('../helpers')
const { upload } = require('../middleWare')
const postModel = require('../../db/models/post.model')
class Post {
    static addPost = async (req, res) => {
        try {
            res.send(req.body)
            if (req.body.type == "file") {
                const uploadThisImage = upload.single('postfile')
                uploadThisImage(req, res, async function (e) {
                    if (e instanceof multer.MulterError)
                        helper.formatMyRes(res, 500, false, e, e.message + 'its a multer error')
                    else if (e) {
                        helper.formatMyRes(res, 500, false, e, e.message + 'another error')
                    }
                    else {
                        try {
                            console.log(req)
                            const post = postModel({ file: req.file.path, userid: req.user._id, ...req.body })
                            const result = await post.save()
                            helper.formatMyRes(res, 200, true, { file: req.file, result }, 'your post added successfully')
                        }
                        catch (e) {
                            helper.formatMyRes(res, 500, false, e, e.message + 'another error')
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
            helper.formatMyRes(res, 500, false, e, e.message + 'another error')
        }
    }
}
module.exports = Post