import axios from 'axios'
import util from 'util'
import cmd from 'node-cmd'
import { iconsServices, IconInterface, IIconsModel } from 'components/icons'
import { infoServices } from 'components/info'
import { NodeLogger } from 'helpers'
import { getEncodedLink, isNewIcon } from './tools'
import prepareUpdatedIcon from './tools/updatingIcons/prepareTheUpdate'
import { getFilled, getOutlined } from './tools/updatingIcons/getSvgCode'
// promise-style version of cmd.get
const pcmdGet = util.promisify(cmd.get)

const updateDBIcons = async () => {
  try {
    // Retrieve the icons' JSON file content:
    const iconsJSONfile = await axios.get(getEncodedLink('dist/js/eos-icons.json'))
    const gitlabIcons = iconsJSONfile.data as IconInterface[]
    // Update the local eos-icons package and move the files using grunt:
    await pcmdGet('npm update eos-icons')
    await pcmdGet('grunt -b ./src moveFiles')

    /**
    **********************************************
    The process of retrieving all the data that will be used in calculations:
    **********************************************
    */

    // Latest Database version's info:
    const currentVersionInfo = await infoServices.getLatestVersionInfo()
    const currVersionDate = new Date(currentVersionInfo.createdAt)
    // Current icons:
    const currentDBIcons = await iconsServices.getAllIcons() as IIconsModel[] | IconInterface[]

    /**
     **********************************************
     The preparation of the objects
     **********************************************
     */

    const newIcons: IconInterface[] = []
    const updatedIcons: string[] = []
    // This will get all the newer icons (new/modified icon):
    const addedAndUpdatedIcons = gitlabIcons.filter(icon => isNewIcon(icon.date, currVersionDate))
    // Iterate through the icons:
    console.time('Updating the icons Process')
    for (const iconDetails of addedAndUpdatedIcons) {
      // ADD the SVG codes to the icon's object:
      const filledSVG = await getFilled(iconDetails.name)
      if (filledSVG === 'NOT FOUND') {
        continue
      }
      iconDetails.svg = filledSVG
      // IF icon has an outlined version, get the svg of it:
      if (iconDetails.hasOutlined) {
        const outlinedSVG = await getOutlined(iconDetails.name)
        if (outlinedSVG === 'NOT FOUND') {
          // if not found, use the same svg code of the filled version
          iconDetails.svgOutlined = iconDetails.svg
        } else {
          iconDetails.svgOutlined = outlinedSVG
        }
      }

      /**
       **********************************************
      Push the new icons to an array, to insert it after the loop.
      For updated icons, prepare the update statement, and update each-one.
       **********************************************
       */
      if (currentDBIcons.findIndex(dbIcon => { return dbIcon.name === iconDetails.name }) === -1) {
        newIcons.push(iconDetails)
      } else {
        const updateDetails = prepareUpdatedIcon(iconDetails)
        await iconsServices.updateIcon(iconDetails.name, updateDetails)
        // Will be used for auditing:
        updatedIcons.push(iconDetails.name)
      }
    }
    // Insert the new icons in the Database:
    iconsServices.insertIcons(newIcons)
    console.timeEnd('Updating the icons Process')
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}
export default updateDBIcons
