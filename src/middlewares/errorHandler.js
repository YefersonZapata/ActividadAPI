function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    ok: false,
    message,
    errors: err.errors || undefined,
  });
}

module.exports = { errorHandler };
