class CustomError extends Error{
    constructor (message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const CustomAPIError =(msg,statusCode)=>{
    return new CustomError(msg,statusCode)
}

module.exports = {CustomAPIError,CustomError};