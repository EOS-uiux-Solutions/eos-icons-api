import redis from 'redis'

// Redis Client:
let redisClient: redis.RedisClient | undefined
if (process.env.NODE_ENV !== 'test') {
  redisClient = redis.createClient()
}
export default redisClient
