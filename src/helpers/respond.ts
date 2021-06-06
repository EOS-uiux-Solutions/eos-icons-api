import Express from 'express'

const respond = (statusCode: number, data: any, res: Express.Response) => {
  res.status(statusCode).json({
    status: true,
    message: 'success',
    data
  })
}

export default respond
