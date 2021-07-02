import { IconInterface } from './interfaces.icons'
import * as iconsModel from './model.icons'

const { Model } = iconsModel

const insertIcon = async (icon: IconInterface) => {
  await Model.create(icon)
}

const getAllIcons = async () => {
  const allIcons = await Model.find({})
  return allIcons
}

const updateIcon = async (iconName: string, updateDetails: Object) => {
  await Model.findOneAndUpdate({ name: iconName }, updateDetails)
}

export {
  insertIcon,
  getAllIcons,
  updateIcon
}
