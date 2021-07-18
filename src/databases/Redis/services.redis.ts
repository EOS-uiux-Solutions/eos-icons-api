import { IconInterface } from 'components/icons'
import { getAllIcons } from 'components/icons/service.icons'
import { redisTools } from 'utils/tools'
import redisClient from './redis'

const updateCachedIcons = async () => {
  const icons: IconInterface[] = await getAllIcons() as IconInterface[]
  console.time('update redis')
  const hsetPromises: Promise<any>[] = []

  for (const icon of icons) {
    for (const key of Object.keys(icon)) {
      const iconSetterPromise = redisTools.asyncRedis.hset(redisClient!, icon.name, key, icon[key])
      hsetPromises.push(iconSetterPromise)
    }
  }

  // allow the promises to run in parallel, but don't return unless all promises are resolved
  const isUpdated = await Promise.all(hsetPromises)
  if (isUpdated) {
    console.timeEnd('update redis')
  }
}

export {
  updateCachedIcons
}
