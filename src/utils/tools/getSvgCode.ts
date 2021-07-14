import { ThemesDirectories } from 'common/constants'
import fs from 'fs'

const getFilled = async (iconName: string) => {
  const iconPath = `${ThemesDirectories.filled}/${iconName}.svg`
  if (fs.existsSync(iconPath)) {
    const svgCode = fs.readFileSync(iconPath, 'utf8')
    return svgCode
  } else {
    const outlinedSvgCode = await getOutlined(iconName)
    return outlinedSvgCode
  }
}

const getOutlined = async (iconName: string) => {
  const outlinedIconPath = `${ThemesDirectories.outlined}/${iconName}.svg`
  if (fs.existsSync(outlinedIconPath)) {
    const svgCode = fs.readFileSync(outlinedIconPath, 'utf8')
    return svgCode
  }
  return 'NOT FOUND'
}

export {
  getFilled,
  getOutlined
}
