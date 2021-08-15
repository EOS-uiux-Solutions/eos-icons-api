import configs from 'configs'
import redis from 'redis'

// Redis Client:
let redisClient: redis.RedisClient | undefined
if (process.env.NODE_ENV !== 'test') {
  redisClient = redis.createClient(configs.Databases.REDISCLOUD_URL)
}
export default redisClient
