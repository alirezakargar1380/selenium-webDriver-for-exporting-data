
//Function for run Promise
success = function ( res,data) {
        res.send({status:1,message:"",
        data:data});

}

//Function for run Promise
error = function (res,message) {
    res.send({status:2,message:message,
        data:[]});
}


//Function for run Promise
socketSuccess = function (data) {
    return {status:1,message:"",
    data:data};

}

//Function for run Promise
socketError = function (message) {
return {status:2,message:message,
    data:[]};
}


//Function for run Promise
exception = function (res,message) {
    res.send({status:0,message:message,
        data:[]});
}


module.exports.success = success;
module.exports.error = error;
module.exports.exception = exception;
module.exports.socketSuccess = socketSuccess;
module.exports.socketError = socketError;

