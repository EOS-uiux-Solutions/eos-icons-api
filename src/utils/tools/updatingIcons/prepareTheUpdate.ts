import { IconInterface } from 'components/icons'

const prepareUpdatedIcon = (newIconDetails: IconInterface) => {
  const updateDetails = {
    $set: {},
    $addToSet: {}
  }
  // loop through the keys
  for (const [key, value] of Object.entries(newIconDetails)) {
    if (key !== 'name' && key !== 'tags') {
      updateDetails.$set[key] = value
    }
    if (key === 'tags') {
      updateDetails.$addToSet[key] = { $each: value }
    }
    // category might be a string or an array
    if (key === 'category') {
      if (typeof newIconDetails[key] === 'string') {
        updateDetails.$set[key] = value
      } else {
        updateDetails.$addToSet[key] = { $each: value }
      }
    }
  }
  return updateDetails
}

export default prepareUpdatedIcon
