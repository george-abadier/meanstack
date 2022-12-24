require('dotenv').config()
const PORT=process.env.PORT||5000
const app=require("./backend/src")
app.listen(PORT,()=>{console.log('now we are listening to port number'+PORT)})