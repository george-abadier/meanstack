const router=require('express').Router()
const postController=require('../app/controllers/post.controller')
const {auth}=require('../app/middleWare')
router.post('/addpost',auth,postController.addPost)
module.exports=router