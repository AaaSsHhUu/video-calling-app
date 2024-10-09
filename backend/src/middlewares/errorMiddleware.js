const errorMiddleware = async (err, req, res, next) => {
    err.message ||= "Some Error Occured";
    err.statusCode ||= 500;

    if(err.name === "CastError"){
        err.message = "Invalid ID"
    }
    
    console.log("Error Stack : " ,err.stack);
    
    return res.status(err.statusCode).json({
        message : err.message,
        error : err
    })
}

export default errorMiddleware;