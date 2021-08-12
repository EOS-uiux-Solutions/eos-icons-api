import configs from 'configs'
import redis from 'redis'

// Redis Client:
let redisClient: redis.RedisClient | undefined
if (process.env.NODE_ENV !== 'test') {
  const redisHost = configs.Databases.RedisHOST
  const redisPort = 6379
  redisClient = redis.createClient(redisPort, redisHost)
}
export default redisClient
