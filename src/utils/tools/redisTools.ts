import { IconInterface } from 'components/icons'
import { RedisClient } from 'redis'

// This array should have the keys that can have values other than string
// Category might be a string or an array, that's why it's added.
// Note: types should be taken from the IconInterface
const nonStringFields = ['tags', 'category', 'hasOutlined']

// For Redis Hash: The keys and values must be strings, that's why we need to stringify other types.
const serialize = (icon: IconInterface): IconInterface => {
  for (const key of Object.keys(icon)) {
    if (nonStringFields.includes(key)) {
      icon[key] = JSON.stringify(icon[key])
    }
  }
  return icon
}

const deserialize = (icon: IconInterface): IconInterface => {
  for (const key of Object.keys(icon)) {
    if (nonStringFields.includes(key)) {
      icon[key] = JSON.parse(icon[key])
    }
  }
  return icon
}

/**
    **********************************************
    Promise style Redis Functions, to avoid using callbacks
    **********************************************
*/

function asyncHset (redisClient: RedisClient, name: string, key: string, value: string) {
  return new Promise(resolve => {
    redisClient.hset(name, key, value, (_, data) => {
      resolve(data)
    })
  })
}

function asyncHgetall (redisClient: RedisClient, name: string) {
  return new Promise(resolve => {
    redisClient.hgetall(name, (_, data) => {
      resolve(data)
    })
  })
}

function asyncHmget (redisClient: RedisClient, name: string, neededFields: string[]) {
  return new Promise(resolve => {
    redisClient.hmget(name, neededFields, (_, data) => {
      resolve(data)
    })
  })
}

function asyncKeys (redisClient: RedisClient) {
  return new Promise(resolve => {
    redisClient.keys('*', (_, data) => {
      resolve(data)
    })
  })
}

const asyncRedis = {
  hset: asyncHset,
  hgetAll: asyncHgetall,
  hmget: asyncHmget,
  keys: asyncKeys
}

export {
  serialize,
  deserialize,
  asyncRedis
}
