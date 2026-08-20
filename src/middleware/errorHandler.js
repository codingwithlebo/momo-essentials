// Central error handler. MoMo API errors from axios carry response.data with details.
// Errors thrown directly in our own services can carry err.status + err.message.
function errorHandler(err, req, res, next) {
  console.error(err.response?.data || err.message);

  const status = err.response?.status || err.status || 500;
  const message = err.response?.data?.message || err.message || 'Something went wrong';

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
