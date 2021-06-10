import Express from 'express'

interface HttpError {
    statusCode: number,
    message: string
}

const handleError = (err: HttpError, res: Express.Response) => {
  const { message, statusCode = 500 }: HttpError = err
  res.status(statusCode).json({
    success: false,
    data: {},
    message
  })
}

export default handleError
