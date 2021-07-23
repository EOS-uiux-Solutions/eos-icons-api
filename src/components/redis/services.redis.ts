import { IconInterface } from 'components/icons'
import { redisClient } from 'databases'
import { redisTools } from 'utils/tools'

// neededFields, must be space separated
const getsetOfIconsCache = async (icons: string[], neededFields: string) => {
  const hgetPromises: Promise<any>[] = []
  // Hmget need it as array of fields
  const arrayOfFields = neededFields.split(' ')

  for (const icon of icons) {
    const iconGetterPromise = redisTools.asyncRedis.hmget(redisClient!, icon, arrayOfFields)
    hgetPromises.push(iconGetterPromise)
  }
  const setOfIcons = await Promise.all(hgetPromises)
  // if an icon is not found, its keys will will be null, that's why we're checking the first key, if it's null
  // it means that the icon is not even found, must be ignored
  const deserializedIcons = setOfIcons.filter(infoValues => {
    if (!infoValues[0]) {
      return false
    }
    return true
    // for each existent icon, convert the array of icon's info values, to object with key:value
  }).map(icon => {
    const iconObject = {}
    icon.forEach((value: string, i: number) => {
      iconObject[arrayOfFields[i]] = value
    })
    return redisTools.deserialize(iconObject as IconInterface)
  })
  return deserializedIcons
}

export {
  getsetOfIconsCache
}
