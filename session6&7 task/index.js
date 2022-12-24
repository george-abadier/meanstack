require("dotenv").config()
const PORT=process.env.PORT||5000
const app=require("./controller/src")
app.listen(PORT,()=>console.log('now we listenningto port '+PORT))