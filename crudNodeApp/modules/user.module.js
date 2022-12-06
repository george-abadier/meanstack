heads = [
    {key:"id",default: Date.now()}, 
    {key:"name", default:null},
    {key: "age", default:null}, 
    {key:"email", default:null}, 
    {key:"status", default:false}]
const deal = require("./deal.module")
class User{
    static add(data){
        const user = {}
        heads.forEach(head => {
            if(head.default!=null) 
                user[head.key]= head.default
            else user[head.key] = data[head.key]
        });
        const all = deal.readFromJson()
        all.push(user)
        deal.writeToJson(all)
    }
    static showAll(){
        const users=deal.readFromJson()
        users.forEach(user=>console.log(user))
    }
    static showSingle(id){
        const users=deal.readFromJson()
    let selectedUser=users.find(user=>user.id=id)
    console.log(selectedUser)
    }
     static edit(user) {
        const users = deal.readFromJson()
        let selectedUserIndex = users.findIndex(usr => usr.id = user.id)
        if (selectedUserIndex == -1) {
            console.log('user isn`t exist')
        } else {
            heads.forEach(head => {
                if (user[head.key]) {
                    users[selectedUserIndex][head.key] = user[head.key]
                }
                deal.writeToJson(users)
            })
        }
    }
    static del(id){
        const users=deal.readFromJson()
        users.splice(users.findIndex(user=>user.id=id)-1,1)
        deal.writeToJson(users)
    }
    static showIF(conditions){
        if(heads.find(head=>conditions[head.key])){
            try{
                const users=deal.readFromJson()
                let selectedUsers=users.filter(user=>{
                    let returnval=true
                    heads.forEach(prop=>{
                        if(conditions[prop.key]){
                            if(prop.key=='name'){
                                console.log(user[prop.key].search(new RegExp(conditions[prop.key],'i')))
                                if(user[prop.key].search(new RegExp(conditions[prop.key],'i'))==-1){
                                    returnval=false
                                }
                            }else{
                                if(user[prop.key]!==conditions[prop.key]){
                                returnval=false
                                }
                            }
                        }
                    })
                    return returnval
                })
                selectedUsers.forEach(user=>console.log(user))
            }
            catch(e){
                console.log(e)
            }
        }else{
            console.log(heads.find(head=>conditions[head.key]))
            User.showAll()
        }
    }
    // static del(id){
    //     const users=deal.readFromJson()
    //     users.splice(users.findIndex(user=>user.id=id)-1,1)
    //     deal.writeToJson(users)
    // }
}
module.exports = User
