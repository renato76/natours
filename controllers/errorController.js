const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  // Operational trusetd error, send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    // programmming error or other unknown, dont leak error details to client
  } else {
    // 1) log error
    console.error('ERROR 💥', err)
    // 2) Send message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    })
  }

}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res)
  }
}