import fs from 'fs'

const moveMissingSvgVersion = async ({ outlineSvgDir, normalSvgDir, tempFolder }) => {
  try {
    const exits = fs.existsSync(tempFolder)
    if (!exits) {
      fs.mkdirSync(tempFolder)
    }

    // Get all the outline icons version
    const outlineList = fs.readdirSync(outlineSvgDir).filter((ele: string | string[]) => ele.includes('.svg'))
    const eosIcons = fs.readdirSync(normalSvgDir).filter((ele: string | string[]) => ele.includes('.svg'))

    const filtered = eosIcons.filter((icon: any) => {
      return outlineList.indexOf(icon) < 0
    })
    console.log('filtered: ', filtered)

    // Move the missing files to complete the outline version
    filtered.forEach((icon: any) => {
      fs.copyFile(`${normalSvgDir}/${icon}`, `${tempFolder}/${icon}`, (err: any) => {
        if (err) throw err
      })
    })

    console.log(`Done moving ${filtered.length} files to complete the missing version`)
  } catch (err) {
    console.log('An Error occured while bundling Outlined icons using grunt ')
  }
}

export default moveMissingSvgVersion
