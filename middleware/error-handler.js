const {CustomError} = require('../custom-error/custom-error')
const errorHandler = (err,req,res,next)=>{
    if(err instanceof CustomError){
       return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({Error:err.message})
}

module.exports =errorHandler;