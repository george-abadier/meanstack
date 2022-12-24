const router=require('express').Router()
const Task=require("../controller/task.controller")
router.get('/add',Task.add)
router.post('/add',Task.add)
router.get('/showall',Task.showAll)
router.get('/show/:id',Task.showSingle)
router.get('/del/:id',Task.delete)
router.get('/changestatus/:id/:status',Task.changeStatus)


module.exports=router