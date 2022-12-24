const{MongoClient}=require('mongodb')
const myConnection=(db)=>{
MongoClient.connect(process.env.url,async(err,client)=>{
    if(err)return console.log(err.message)
    const db=client.db(process.env.dbName)
})
}
module.exports=MongoClient