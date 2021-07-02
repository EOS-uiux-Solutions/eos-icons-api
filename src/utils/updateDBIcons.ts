import axios from 'axios'
import { iconsServices, IconInterface, IIconsModel } from 'components/icons'
import { infoServices } from 'components/info'
import { NodeLogger } from 'helpers'
import { getEncodedLink, isNewIcon, addSvgCodes } from './tools'

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
     * Prepare the new and updated icons Arrays
     *
     */

    const newIcons: IconInterface[] = []
    // This will get all the newer icons (new/modified icon):
    const addedAndUpdatedIcons = gitlabIcons.filter(icon => isNewIcon(icon.date, currVersionDate))
    // Iterate through the icons to add the svg codes:
    for (const iconDetails of addedAndUpdatedIcons) {
      // Add svg Codes:
      const iconWithSvg = await addSvgCodes(iconDetails)
      if (iconWithSvg === 404) {
        continue
      }
      if (currentDBIcons.findIndex(dbIcon => { return dbIcon.name === iconDetails.name }) === -1) {
        newIcons.push(iconWithSvg)
        // TODO:: add all to the db:
      } else {
        // UPDATE THE DOCUMENT
      }
    }

    /**
     *
     * Update the database documents
     *
     */
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}
export default updateDBIcons
