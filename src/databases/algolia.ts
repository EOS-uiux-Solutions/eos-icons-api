
import algoliasearch from 'algoliasearch'
import { iconsServices } from 'components/icons'
import configs from 'configs'
import { Logger } from 'helpers'

const client = algoliasearch(configs.ALGOLIA_APP_ID, configs.ALGOLIA_ADMIN_KEY, {
  timeouts: {
    connect: 100, // connection timeout in seconds
    read: 5, // read timeout in seconds
    write: 30 // write timeout in seconds
  }
})
const AlgoliaLogger = new Logger('Updating Algolia logger')

const updateAlgoliaIcons = async () => {
  try {
    console.time('Updating Algolia icons')
    const index = client.initIndex('eosicons')
    const dbIcons = await iconsServices.getAllIcons()
    await index.clearObjects()
    await index.saveObjects(dbIcons, { autoGenerateObjectIDIfNotExist: true })
    console.timeEnd('Updating Algolia icons')
  } catch (err: any) {
    AlgoliaLogger.logError('The updating method', err)
  }
}

export default updateAlgoliaIcons
