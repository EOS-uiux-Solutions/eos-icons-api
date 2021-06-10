import config from 'config'

interface configsInterface {
    env: string,
    FRONTEND_HOST: string,
    API_PREFIX: string,
    LOG_FILE_PATH: string
}

const configs: configsInterface = {
  env: config.get('env'),
  FRONTEND_HOST: config.get('FRONTEND_HOST'),
  API_PREFIX: config.get('API_PREFIX'),
  LOG_FILE_PATH: config.get('LOG_FILE_PATH')
}

export default configs
