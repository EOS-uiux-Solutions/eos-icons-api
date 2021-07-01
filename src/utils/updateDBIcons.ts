import axios from 'axios'
import { iconsServices, IconInterface, IIconsModel } from 'components/icons'
import { infoServices } from 'components/info'
import { NodeLogger } from 'helpers'
import { getEncodedLink, isNewIcon } from './tools'

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

    const iconsDictionary = {}
    // This will add all the icons that has a date bigger than the current version (new/modified icon) - to the iconsDictionary
    gitlabIcons.filter(icon => isNewIcon(icon.date, currVersionDate)).forEach(element => {
      iconsDictionary[element.name] = element
    })

    const newIcons: IconInterface[] = []
    for (const [IconName, iconObject] of Object.entries(iconsDictionary)) {
      // If the icon doesn't exist in the crreuntDBicons, it means that this icon is new:
      if (currentDBIcons.findIndex(currentIcon => { return currentIcon.name === IconName }) === -1) {
        newIcons.push(iconObject as IconInterface)
      }
    }
    console.log(newIcons)
  } catch (err) {
    NodeLogger.logError('UdpateDBIcons', err)
  }
}
export default updateDBIcons
