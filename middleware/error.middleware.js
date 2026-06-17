
class HandleError extends Error {
    constructor (message , statusCode , errorCode ){
        super(message);
        this.statusCode=statusCode;
        this.errorCode= errorCode;
        this.isOperational = true;
        Error.captureStackTrace(this , this.constructor)
    }
};



class BadRequestError extends HandleError {
    constructor(message="Bad request") {
        super(message , 400 , "BAD_REQUEST");
    }
}


class UnAuthorizedError extends HandleError {
    constructor(message="UnAuthorized Error") {
        super(message , 401 , "UNAUTHORIZED");
    }
}

class NotFoundError extends HandleError {
    constructor(message="Not Found Error") {
        super(message , 404 , "NOT-FOUND");
    }
}

class ConflictError extends HandleError {
    constructor(message="Conflict Error") {
        super(message , 405 , "CONFLICT-ERROR");
    }
}


class ValidationError extends HandleError {
    constructor (message = "Validation failed" , errors={}){
        super (message , 422 , "VALIDATION_ERROR");
        this.errors = errors;
    }
}

class InternalServerError extends HandleError {
    constructor(message ="Internal server error"){
        super(message , 500 , "SERVER_ERROR")
    }
}

export { HandleError, BadRequestError, UnAuthorizedError, NotFoundError, ConflictError, ValidationError , InternalServerError };