export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    });
  }

  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).json({
      error: 'Database Constraint Error',
      message: err.message
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
}