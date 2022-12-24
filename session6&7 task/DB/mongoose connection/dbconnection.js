const mongoose = require('mongoose')
try{
    mongoose.connect(process.env.mongooseURL)
}
catch(e){
    console.log(e.message)
}