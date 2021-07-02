import axios from 'axios'
import { FILES_PATHS } from 'common/constants'
import { IconInterface } from 'components/icons'
import getEncodedLink from './getEncodedLink'

const validateStatus = (status: Number) => {
  // to resolve even if the icon is not found (404 error), this
  // function will prevent the axios from throwing an error
  return status < 500
}

const getSvgFromFile = async (iconDetails: IconInterface) => {
  const { type } = iconDetails
  const typeFolder = type === 'animated' ? 'animated-svg' : 'svg'
  const svgRequest = await axios.get(getEncodedLink(`${typeFolder}/${iconDetails.name}.svg`), { validateStatus: validateStatus })
  if (svgRequest.status === 404 && type === 'static') {
    const svgRequest = await axios.get(getEncodedLink(`${typeFolder}/material/${iconDetails.name}.svg`), { validateStatus: validateStatus })
    return svgRequest
  }
  return svgRequest
}

const getOutlinedFromFile = async (iconInfo: IconInterface) => {
  const iconFolder = `${FILES_PATHS.OUTLINED_SVG}material/`
  const svgRequest = await axios.get(getEncodedLink(`${iconFolder}${iconInfo.name}.svg`), { validateStatus: validateStatus })
  return svgRequest
}

export {
  getSvgFromFile,
  getOutlinedFromFile
}
