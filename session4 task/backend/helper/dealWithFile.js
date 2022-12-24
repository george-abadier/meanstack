const fs=require('fs')
const path=require('path')
class Deal{
    static writeToJson=(data,filePath=path.join(__dirname,"../../mybooksdata.json"))=>{
       fs.writeFileSync(filePath,JSON.stringify(data))
    };
    static readFromJson=(filePath=path.join(__dirname,"../../mybooksdata.json"))=>{
        let data
        try{
            data=JSON.parse(fs.readFileSync(filePath))
        }
        catch(e){
            data=[]
        }
        return data
    }
}
module.exports=Deal