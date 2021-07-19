import { IconInterface } from 'components/icons'
import { getAllIcons } from 'components/icons/service.icons'
import { redisTools } from 'utils/tools'
import { redisClient } from '../databases/'
import { NodeLogger } from 'helpers'

const updateCachedIcons = async () => {
  try {
    const icons: IconInterface[] = await getAllIcons() as IconInterface[]
    console.time('update redis')
    const hsetPromises: Promise<any>[] = []

    for (const icon of icons) {
      const serializedIcon = redisTools.serialize(icon)
      for (const key of Object.keys(serializedIcon)) {
        const iconSetterPromise = redisTools.asyncRedis.hset(redisClient!, serializedIcon.name, key, serializedIcon[key])
        hsetPromises.push(iconSetterPromise)
      }
    }

    // allow the promises to run in parallel, but don't return unless all promises are resolved
    const isUpdated = await Promise.all(hsetPromises)
    if (isUpdated) {
      console.timeEnd('update redis')
    }
  } catch (err) {
    NodeLogger.logError('UpdateCachedIcons', err)
  }
}

export default updateCachedIcons
