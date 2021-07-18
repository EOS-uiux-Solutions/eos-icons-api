import configs from 'configs'
import redis from 'redis'
const { Databases } = configs

// Redis Client:
const redisPort = 6379 // the default port
const redisClient = redis.createClient(redisPort, Databases.RedisClient)

export default redisClient
