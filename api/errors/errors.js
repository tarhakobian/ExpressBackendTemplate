class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;  // Flag to differentiate between operational and programming errors
    }
}

class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = "Invalid request") {
        super(message, 400);
    }
}

class DuplicateUserError extends AppError {
    constructor(message = "User with these credentials already exists") {
        super(message, 409); //409 - Conflict
    }
}

class PasswordValidationError extends AppError {
    constructor(message = "Password doesn't match") {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "Forbidden : Unauthorized request") {
        super(message, 403);
    }
}

class BadRequestError extends AppError {
    constructor(message = "Missing required parameters or don't match the constraints") {
        super(message, 400);
    }
}



module.exports = {
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    DuplicateUserError,
    PasswordValidationError,
    BadRequestError,
    AppError
}