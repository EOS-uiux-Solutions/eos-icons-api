import configs from 'configs'

function isProduction (requestHost: string) {
  const isRequestFromProduction = requestHost === configs.FRONTEND_HOST
  if (configs.env === 'production' && isRequestFromProduction) {
    return true
  }
  return false
}

export default isProduction
