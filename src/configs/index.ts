import dotenv from 'dotenv'
dotenv.config({ path: './src/configs/.env' })

interface ConfigsInterface {
    env: string,
    FRONTEND_HOST: string,
    API_PREFIX: string,
    LOG_FILE_PATH: string
    Databases: {
    MongoURI: string
    REDISCLOUD_URL: string
    },
    GITLAB_READ_API: string
    GITLAB_TAGS_API: string
    GITLAB_HOOK_TOKEN: string
    ALGOLIA_APP_ID: string,
    ALGOLIA_ADMIN_KEY: string
    ADMIN_SECRET_KEY: string
}

const configs: ConfigsInterface = {
  env: process.env.env as string,
  FRONTEND_HOST: process.env.FRONTEND_HOST as string,
  API_PREFIX: process.env.API_PREFIX as string,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH as string,
  GITLAB_READ_API: process.env.GITLAB_READ_API as string,
  GITLAB_TAGS_API: process.env.GITLAB_TAGS_API as string,
  GITLAB_HOOK_TOKEN: process.env.GITLAB_HOOK_TOKEN as string,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID as string,
  ALGOLIA_ADMIN_KEY: process.env.ALGOLIA_ADMIN_KEY as string,
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY as string,
  Databases: {
    MongoURI: process.env.MongoURI as string,
    REDISCLOUD_URL: process.env.REDISCLOUD_URL as string
  }
}

export default configs
