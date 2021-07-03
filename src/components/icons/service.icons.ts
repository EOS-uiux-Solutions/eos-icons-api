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
  const allIcons = await Model.find({})
  return allIcons
}

const updateIcon = async (iconName: string, updateDetails: Object) => {
  await Model.findOneAndUpdate({ name: iconName }, updateDetails)
}

export {
  insertIcons,
  deleteIcons,
  getAllIcons,
  updateIcon
}
