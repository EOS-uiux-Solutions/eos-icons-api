/* eslint-disable dot-notation */
import { IconInterface } from 'components/icons'

const prepareUpdatedIcon = (newIconDetails: IconInterface, currentDBicon: IconInterface) => {
  const updateDetails = {
    $set: {},
    $addToSet: {}
  }
  // loop through the keys
  for (const [key, value] of Object.entries(newIconDetails)) {
    if (key === 'svg' || key === 'svgOutlined') {
      const isModified = newIconDetails[key] !== currentDBicon[key]
      if (isModified) {
        updateDetails.$set[`${key}ModifiedAt`] = new Date().toISOString()
        updateDetails.$set[key] = value
      }
    } else if (key === 'tags') {
      updateDetails.$addToSet[key] = { $each: value }
    } else if (key === 'category') { // category might be a string or an array
      if (typeof newIconDetails[key] === 'string') {
        updateDetails.$set[key] = value
      } else {
        updateDetails.$addToSet[key] = { $each: value }
      }
    } else {
      if (key !== 'name' && (newIconDetails[key] !== currentDBicon[key])) {
        updateDetails.$set[key] = value
      }
    }
  }
  return updateDetails
}

export default prepareUpdatedIcon
