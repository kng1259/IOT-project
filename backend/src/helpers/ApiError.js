class ApiError extends Error {
    status;
    isOperational;
    constructor(status, message, isOperational = true, stack = '') {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        stack ? (this.stack = stack) : Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
