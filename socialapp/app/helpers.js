class Helper{
    static formatMyRes=(res,statusCode,apiStatus,data,apiMessage,)=>{
        res.status(statusCode).send({
            apiStatus,
            data,
            apiMessage
        })
    }
}
module.exports=Helper