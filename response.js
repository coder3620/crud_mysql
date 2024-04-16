exports.sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).send({
        success: true,
        status: statusCode,
        data
    });
};

exports.sendError = (res, error, statusCode = 500) => {
    res.status(statusCode).send({
        success: false,
        status: statusCode,
        message: error.message || 'An error occurred'
    });
};
