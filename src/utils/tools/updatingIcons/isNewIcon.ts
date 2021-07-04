const isNewIcon = (iconCreationDate: string, currentVersionDate: Date) => {
  // icon creation date's style is: DD/MM/yyyy, we need to convert it to the standard: yyyy-DD-MM
  // to be able to make a comparison.
  const creationDate = new Date(iconCreationDate.split('/').reverse().join('-'))
  return creationDate > currentVersionDate
}

export default isNewIcon
