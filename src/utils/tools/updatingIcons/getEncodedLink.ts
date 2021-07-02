import configs from 'configs'

/**
 *
 * Generate encoded links, because gitlab is using an encoded file paths
 *
 */
const getEncodedLink = (pathToFile: string) => {
  const APILink = configs.GITLAB_READ_API
  const encodedPath = pathToFile.replace(/\//g, '%2F')
  const options = 'raw?ref=master'
  const encodedLink = `${APILink}/${encodedPath}/${options}`
  return encodedLink
}

export default getEncodedLink
