import configs from 'configs'
import redis from 'redis'
const { Databases } = configs

// Redis Client:
let redisClient: redis.RedisClient | undefined
if (process.env.NODE_ENV !== 'test') {
  const redisPort = 6379 // the default port
  redisClient = redis.createClient(redisPort, Databases.RedisClient)
}
export default redisClient
