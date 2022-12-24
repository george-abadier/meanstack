const express=require('express')
const hbs=require('hbs')
const path=require('path')
const app=express()
const routes=require('./routes/router')
app.use(express.static(path.join(__dirname,'../frontend/statics') ))
app.set("view engine","hbs")
app.set("views",path.join(__dirname,'../frontend/views'))
app.use(express.urlencoded({extended:true}))
hbs.registerPartials(path.join(__dirname,'../frontend/layouts'))
hbs.registerHelper("isId",(value)=>{return value=='id'})
hbs.registerHelper("isName",(value)=>{return value=='name'})
hbs.registerHelper("isNumOfPages",(value)=>{return value=='numOfPages'})
app.use(routes)
app.all('*',(req,res)=>{res.render("error",{
    pageTitle:'Some Error',
    error:"sorry invalid url"})
})
module.exports=app