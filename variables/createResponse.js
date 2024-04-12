exports.createResponse = (errorCode, errorMessage, data)=>{
    return {
        err_code:errorCode,
        err_message:errorMessage,
        data:data
    }
}