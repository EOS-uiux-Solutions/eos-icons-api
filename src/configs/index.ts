import config from 'config'

interface configsInterface {
    env: string,
    FRONTEND_HOST: string,
}

const configs: configsInterface = {
  env: config.get('env'),
  FRONTEND_HOST: config.get('FRONTEND_HOST')
}

export default configs
