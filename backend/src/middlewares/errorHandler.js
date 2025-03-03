// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }
    res.status(err.status).json({ message: err.message });
};

export default errorHandler;
