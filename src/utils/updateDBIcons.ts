import axios from 'axios'
import util from 'util'
import cmd from 'node-cmd'
import { iconsServices, IconInterface, IIconsModel } from 'components/icons'
import { infoServices } from 'components/info'
import { Logger, NodeLogger } from 'helpers'
import { getEncodedLink, isNewIcon } from './tools'
import prepareUpdatedIcon from './tools/updatingIcons/prepareTheUpdate'
import { getFilled, getOutlined } from './tools/updatingIcons/getSvgCode'
import configs from 'configs'
// promise-style version of cmd.get
const pcmdGet = util.promisify(cmd.get)

const updateIconsLogger = new Logger('updateDBIcons')

const updateDBIcons = async (notifiedByHook = false) => {
  try {
    // Latest Database version's info:
    const currentVersionInfo = await infoServices.getLatestVersionInfo()
    // in initial setup, there wouldn't be any versions stored in the db, that's why we set an old date.
    const currVersionDate = new Date(currentVersionInfo ? currentVersionInfo.createdAt : '1999-03-20')
    if (!notifiedByHook) {
      // if not notified by hook, we need to make sure that there's a new release first
      const eosIconsTAGS = await axios.get(configs.GITLAB_TAGS_API)
      const latestReleaseDate = eosIconsTAGS.data[0].commit.committed_date
      if (latestReleaseDate <= currVersionDate) {
        updateIconsLogger.logInfo('', { message: 'icons is up to date, updating process is finished' })
        return
      }
    }
    updateIconsLogger.logInfo('', { message: 'The process of updating the icons is started' })
    console.time('Updating the icons Process')
    // Retrieve the icons' JSON file content:
    const iconsJSONfile = await axios.get(getEncodedLink('dist/js/eos-icons.json'))
    const gitlabIcons = iconsJSONfile.data as IconInterface[]
    updateIconsLogger.logInfo('Retriving the icons', { message: 'Finished' })
    // Update the local eos-icons package and move the files using grunt:
    await pcmdGet('npm update eos-icons')
    await pcmdGet('grunt -b ./src moveFiles')
    updateIconsLogger.logInfo('Updating the local package, and moving the files', { message: 'Finished' })

    /**
     **********************************************
     The process of retrieving all the data that will be used in calculations:
     **********************************************
     */

    // Current icons:
    const currentDBIcons = await iconsServices.getAllIcons() as IIconsModel[] | IconInterface[]
    updateIconsLogger.logInfo('Retrieving the needed data from the databases and APIs', { message: 'Finished' })

    /**
     **********************************************
     The preparation of the objects
     **********************************************
     */
    const newIcons: IconInterface[] = []
    const deletedIcons: string[] = []
    // for auditing purposes:
    const namesOfDeletedIcons: string[] = []
    const namesOfUpdatedIcons: string[] = []
    const namesOfNewIcons: string[] = []
    // This will get all the newer icons (new/modified icon):
    const addedAndUpdatedIcons = gitlabIcons.filter(icon => isNewIcon(icon.date, currVersionDate))
    // Iterate through the icons:
    updateIconsLogger.logInfo('The preparation of the files', { message: 'Finished' })
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
        namesOfNewIcons.push(iconDetails.name)
      } else {
        const updateDetails = prepareUpdatedIcon(iconDetails)
        await iconsServices.updateIcon(iconDetails.name, updateDetails)
        namesOfUpdatedIcons.push(iconDetails.name)
      }
    }
    // Insert the new icons in the Database:
    if (newIcons.length !== 0) {
      await iconsServices.insertIcons(newIcons)
    }
    // delete the deleted icons from the db
    for (const dbIcon of currentDBIcons) {
      if (gitlabIcons.findIndex(gitlabIcon => { return gitlabIcon.name === dbIcon.name }) === -1) {
        deletedIcons.push(dbIcon._id as string)
      }
    }
    if (deletedIcons.length !== 0) {
      await iconsServices.deleteIcons(deletedIcons)
    }
    updateIconsLogger.logInfo('', { message: 'The process of updating the icons is Finished' })
    console.timeEnd('Updating the icons Process')

    /**
       **********************************************
      Add an info about the updated/added/deleted icons
       **********************************************
       */
    infoServices.createInfoDocument({ iconsAdded: namesOfNewIcons, iconsUpdated: namesOfUpdatedIcons, iconsDeleted: namesOfDeletedIcons })
    updateIconsLogger.logInfo('', { message: 'Update info is added to the db' })
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}
export default updateDBIcons
