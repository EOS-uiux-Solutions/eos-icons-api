import axios from 'axios'
import { IconInterface } from 'components/icons'
import getEncodedLink from './getEncodedLink'

const getSvgCode = async (iconInfo: IconInterface) => {
  const iconSVGinfo = {
    hasOutlined: false,
    svg: '',
    outlined_svg: ''
  }
  if (iconInfo.type === 'animated') {
    const svgRequest = await axios.get(getEncodedLink(`animated-svg/${iconInfo.name}.svg`))
    iconSVGinfo.svg = svgRequest.data as string
  } else {

  }
}

export default getSvgCode
