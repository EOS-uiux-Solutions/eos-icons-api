import { promises as pfs } from 'fs'

async function addConfigFile (path: string, data: string) {
  try {
    await pfs.writeFile(path, data)
  } catch (err) {
    throw new Error(`An error occured while adding the config file: ${err}`)
  }
}

export default addConfigFile
