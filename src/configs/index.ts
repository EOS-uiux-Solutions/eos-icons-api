import dotenv from 'dotenv'
dotenv.config({ path: './src/configs/.env' })

interface configsInterface {
    env: string,
    FRONTEND_HOST: string,
    API_PREFIX: string,
    LOG_FILE_PATH: string
    Databases: {
    MongoURI: string
    }
}

const configs: configsInterface = {
  env: process.env.env as string,
  FRONTEND_HOST: process.env.FRONTEND_HOST as string,
  API_PREFIX: process.env.API_PREFIX as string,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH as string,
  Databases: {
    MongoURI: process.env.MongoURI as string
  }
}

export default configs
