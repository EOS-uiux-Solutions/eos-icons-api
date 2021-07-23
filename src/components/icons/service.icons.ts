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
  await Model.findOneAndUpdate({ _id: iconID }, updateDetails)
}

export {
  insertIcons,
  deleteIcons,
  getAllIcons,
  getSetOfIcons,
  updateIcon
}
