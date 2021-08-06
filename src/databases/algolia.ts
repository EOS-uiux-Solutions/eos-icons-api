
import algoliasearch from 'algoliasearch'
import { iconsServices } from 'components/icons'
const client = algoliasearch('', '')

const updateAlgoliaIcons = async () => {
  const index = client.initIndex('eosicons')
  const dbIcons = await iconsServices.getAllIcons()
  await index.clearObjects()
  await index.saveObjects(dbIcons)
}

export default updateAlgoliaIcons
