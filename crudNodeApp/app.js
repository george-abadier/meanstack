const user = require("./modules/user.module")
const yargs = require('yargs')
yargs.command({
    command:"add",
    builder:{
        name:{demandOption:true},
        age:{demandOption:false},
        email:{demandOption:false}
    },
    handler: function(argv){
        user.add(argv)
    }
})
yargs.command({
    command:"showAll",
    handler: function(argv){
        user.showAll()
    }
})
yargs.command({
    command:"showSingle",
    builder:{
        id:{demandOption:true},
    },
    handler: function(argv){
        user.showSingle(argv.id)
    }
})
yargs.command({
    command:"edit",
    builder:{
        id:{demandOption:true},
    },
    handler: function(argv){
        user.edit(argv)
    }
})
yargs.command({
    command:"del",
    handler: function(argv){
        user.del(argv.id)
    }
})
yargs.command({
    command:"showIF",
    handler: function(argv){
        user.showIF(argv)
    }
})
yargs.argv