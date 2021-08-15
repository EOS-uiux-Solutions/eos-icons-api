import { suggestionInterfaces } from 'components/suggestion'
import { suggestionType } from 'components/suggestion/interfaces.suggestion'
import { IconInterface } from './interfaces.icons'
import * as iconsModel from './model.icons'

const { Model } = iconsModel

const insertIcons = async (icons: IconInterface[]) => {
  await Model.collection.insertMany(icons)
}

const deleteIcons = async (iconsIDs: string[]) => {
  await Model.deleteMany({ _id: { $in: iconsIDs } })
}

const getAllIcons = async () => {
  const allIcons = await Model.find({}).lean() as IconInterface[]
  return allIcons
}

// neededFields, must be space separated
const getSetOfIcons = async (icons: string[], neededFields: string = '') => {
  const iconsSet = await Model.find({ name: { $in: icons } }, neededFields)
  return iconsSet
}

const updateIcon = async (iconID: string, updateDetails: Object) => {
  const updated = await Model.findOneAndUpdate({ _id: iconID }, updateDetails)
  return updated
}

const addSuggested = async (iconName: string, type: suggestionInterfaces.suggestionType, additions: string[]) => {
  const updateDetails = { $set: {}, $addToSet: {} }
  if (type === suggestionType.tags) {
    updateDetails.$addToSet[type] = { $each: additions }
  } else if (type === suggestionType.category) {
    // category is string
    if (additions.length === 1) {
      updateDetails.$set[type] = additions[0]
    } else {
      updateDetails.$addToSet[type] = { $each: additions }
    }
  }
  const added = await Model.findOneAndUpdate({ name: iconName }, updateDetails)
  return added
}

// will be used in tests
const deleteApprovedSuggestion = async (iconName: string, suggestion: string) => {
  const deleted = await Model.updateOne({ iconName }, { $pull: { tags: { suggestion } } })
  return deleted
}

export {
  insertIcons,
  deleteIcons,
  getAllIcons,
  getSetOfIcons,
  updateIcon,
  addSuggested,
  deleteApprovedSuggestion
}
