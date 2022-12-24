const { MongoClient } = require("mongodb");
const connection = (myFunction) => {
    MongoClient.connect(process.env.DBURL, (error, client) => {
        if (error) return console.log(error.message)
        const ourDB = client.db(process.env.DBName)
        myFunction(ourDB)
    })
}
module.exports=connection