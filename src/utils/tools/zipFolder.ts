import pify from 'pify'
import zipFolderPackage from 'zip-folder'
// promise-style version of zip-folder
const pzipFolder = pify(zipFolderPackage)

async function zipFolder (folderPath: string, outputPath: string) {
  try {
    await pzipFolder(folderPath, outputPath)
  } catch (err) {
    throw new Error(`Some error occurred while generating the zip file: ${err}`)
  }
}

export default zipFolder
