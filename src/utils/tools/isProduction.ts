import configs from 'configs'

const isProduction = (requestHost: string) => {
  const isRequestFromProduction = requestHost === configs.FRONTEND_HOST
  if (configs.env === 'production' && isRequestFromProduction) {
    return true
  }
  return false
}

export default isProduction
