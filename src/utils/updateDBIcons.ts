import axios from 'axios'
import { NodeLogger } from 'helpers'
import { getEncodedLink } from './tools'
const updateDBIcons = async () => {
  try {
    // Retrieve the icons' JSON file content:
    const iconsJSONfile = await axios.get(getEncodedLink('dist/js/eos-icons.json'))
    const iconsArray = iconsJSONfile.data as object[]
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}

updateDBIcons()
export default updateDBIcons
