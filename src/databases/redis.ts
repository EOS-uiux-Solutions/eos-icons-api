import configs from 'configs'
import redis from 'redis'

// Redis Client:
let redisClient: redis.RedisClient | undefined
if (process.env.NODE_ENV !== 'test') {
  redisClient = redis.createClient(configs.Databases.REDISCLOUD_URL, { no_ready_check: true })
}
export default redisClient
