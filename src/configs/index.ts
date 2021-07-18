import dotenv from 'dotenv'
dotenv.config({ path: './src/configs/.env' })

interface ConfigsInterface {
    env: string,
    FRONTEND_HOST: string,
    API_PREFIX: string,
    LOG_FILE_PATH: string
    Databases: {
    MongoURI: string
    RedisClient: string
    },
    GITLAB_READ_API: string
    GITLAB_TAGS_API: string
}

const configs: ConfigsInterface = {
  env: process.env.env as string,
  FRONTEND_HOST: process.env.FRONTEND_HOST as string,
  API_PREFIX: process.env.API_PREFIX as string,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH as string,
  GITLAB_READ_API: process.env.GITLAB_READ_API as string,
  GITLAB_TAGS_API: process.env.GITLAB_TAGS_API as string,
  Databases: {
    MongoURI: process.env.MongoURI as string,
    RedisClient: process.env.REDIS_CLIENT_NAME as string
  }
}

export default configs
