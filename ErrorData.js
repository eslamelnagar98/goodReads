


const ErrorObject = function (message,statusCode) {
    this.message = message;
    this.statusCode = statusCode;
}


const badRequestError =  (message) => {
    errMessage = message || "Bad Request"
    return new ErrorObject(errMessage,400);
}


const unauthorizedError =  (message) => {
    errMessage = message || "Unauthorized"
    return new ErrorObject(errMessage,401);
}


const notFoundError =  (message) => {
    errMessage = message || "Not Found"
    return new ErrorObject(errMessage,404);
}

const notAcceptableError =  (message) => {

    errMessage = message || "Data not sent according to format"
    return new ErrorObject(errMessage,406);
}

const internalServerError =  (message) => {

    errMessage = message || "Internal Server Error, Please try again later!"
    return new ErrorObject(errMessage,500);
}

module.exports = {
    ErrorObject,
    badRequestError,
    unauthorizedError,
    notFoundError,
    notAcceptableError,
    internalServerError
}
