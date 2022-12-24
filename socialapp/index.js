require('dotenv').config()
const app=require('./app/src')
const Port=process.env.Port||5000
app.listen(Port,()=>{console.log('now we are listening to port'+Port)})