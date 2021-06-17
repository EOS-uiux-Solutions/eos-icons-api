import { iconsTheme, iconsThemeV1 } from 'common/types'
import { ThemesDirectories } from 'common/constants'

// *********************************
// This function is used to return the appropriate directory, based on the theme:
// we're handling the case of `svg` and `svg-outlined` manually for now, until the full
// depreciation of version 1 APIs
// *********************************

const getThemeDir = (theme: iconsTheme | iconsThemeV1 = iconsTheme.filled) => {
  let themeDir: string
  if (theme === 'svg') {
    themeDir = ThemesDirectories[iconsTheme.filled]
  } else if (theme === 'svg-outlined') {
    themeDir = ThemesDirectories[iconsTheme.outlined]
  } else {
    themeDir = ThemesDirectories[theme]
  }
  return themeDir
}

export default getThemeDir
