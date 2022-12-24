// const connection = require('../../db/mongodb connection/dbconnection')
const TaskModel = require('../../DB/modals/task.modal')
class Task {
    static showAll = async (req, res) => {
        try {
            // connection(ourDB => {
            //     ourDB.collection('tasks').find().toArray((error, result) => {
            //         if (error) res.render('error', { pageTitle: "ERROR", error: error.message })
            //         const keys = Object.keys(result[0])
            //         res.render('showAll', { pageTitle: "Your Tasks", tasks: result, keys })
            //     })
            // })
            const tasks = await TaskModel.find()
            res.send(tasks)
        } catch (e) {
            res.render('error', { pageTitle: "ERROR", error: e.message })
        }
    }
    static showSingle = async (req, res) => {
        try {
            // console.log(typeof req.params.id)
            // connection(ourDB => {
            //     ourDB.collection("tasks").findOne({ id : Number(req.params.id) })
            //     .then(result=>{
            //         console.log(result)
            //         res.send(result)
            //     })
            //     .catch((e)=>{
            //         console.log(e.message)
            //     })
            // })
            const task = await TaskModel.find({ _id: req.params.id })
            res.send(task)
        } catch (e) {
            res.render('error', { pageTitle: "ERROR", error: e.message })
        }
    }
    static delete = async (req, res) => {
        // connection(async ourDB=>{
        //    let result=await ourDB.collection('tasks').deleteOne({id:Number(req.params.id)})
        //    console.log(result)
        //    res.redirect("/showall")
        // })
        try {
            const result = await TaskModel.findByIdAndDelete(req.params.id)
            res.send(result)
        } catch (e) {
            res.render('error', { pageTitle: "ERROR", error: e.message })
        }
    }

    static changeStatus = async (req, res) => {
        // connection(ourDB => {
        //     ourDB.collection("tasks").updateOne({ id: Number(req.params.id) }, { $set: { status: Boolean(req.params.status == "false" ? 0 : 1) } })
        //         .then(result => {
        //             console.log(result)
        //             res.redirect("/showall")
        //         }).catch((e) => {
        //             console.log(e.message)
        //         })
        // })
        try {
            console.log('a')
            const result = await TaskModel.findByIdAndUpdate(req.params.id,{$set:{ status:req.params.status }})
            console.log('b')
            res.send(result)
        } catch (e) {
            res.render('error', { pageTitle: "ERROR", error: e.message })
        }
    }
    static add = async (req, res) => {
        if (req.method == "GET") {
            res.render('addTask', {
                pageTitle: 'ADD Task'
            })
        } else {
            try {
                // req.body.taskDeadLine=new Date(req.body.taskDeadLine)
                // console.log(req.body)
                const task = new TaskModel(req.body)
                console.log("a")
                const result = await task.save()
                console.log('b')
                // connection(async ourDB => {
                //     let result = await ourDB.collection('tasks').insertOne(task)
                //     // .then(result=>{
                console.log(result)
                res.send(result)
                //     res.redirect("/showall")
                //     // }).catch(e=>{
                //     //     res.render('error', {
                //     //         pageTitle: 'ERROR',
                //     //         error: e.message
                //     //     })
                //     // })
                // })
            }
            catch (e) {
                console.log(e.message)
                res.render('error', {
                    pageTitle: 'ERROR',
                    error: e.message
                })
            }
        }
    }
}
module.exports = Task