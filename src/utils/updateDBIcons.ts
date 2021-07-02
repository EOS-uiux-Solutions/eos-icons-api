import axios from 'axios'
import { iconsServices, IconInterface, IIconsModel } from 'components/icons'
import { infoServices } from 'components/info'
import { NodeLogger } from 'helpers'
import { getEncodedLink, isNewIcon } from './tools'
import { getOutlinedFromFile, getSvgFromFile } from './tools/getSvgData'

const updateDBIcons = async () => {
  try {
    // Retrieve the icons' JSON file content:
    const iconsJSONfile = await axios.get(getEncodedLink('dist/js/eos-icons.json'))
    const gitlabIcons = iconsJSONfile.data as IconInterface[]

    /**
    *
    * Retrieve the info about the current version
    *
    */

    // Latest Database version's info:
    const currentVersionInfo = await infoServices.getLatestVersionInfo()
    const currVersionDate = new Date(currentVersionInfo.createdAt)
    // Current icons:
    const currentDBIcons = await iconsServices.getAllIcons() as IIconsModel[] | IconInterface[]

    /**
     *
     * Calculations to determine the changes:
     *
     */

    const newIcons: IconInterface[] = []
    // This will get all the newer icons (new/modified icon):
    const addedAndUpdatedIcons = gitlabIcons.filter(icon => isNewIcon(icon.date, currVersionDate))
    // Iterate through the icons to add the svg codes:
    for (const iconDetails of addedAndUpdatedIcons) {
      // get the main svg code:
      const svgRequest = await getSvgFromFile(iconDetails)
      if (svgRequest.status === 404) {
        continue
      }
      // Get the outlined version if available:
      if (iconDetails.hasOutlined) {
        const outlinedRequest = await getOutlinedFromFile(iconDetails)
        if (outlinedRequest.status === 404) {
          continue
        }
        iconDetails.svgOutlined = outlinedRequest.data
      }
      iconDetails.svg = svgRequest.data
      newIcons.push(iconDetails)
    }
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}
export default updateDBIcons
