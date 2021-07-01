import { IconInterface } from './interfaces.icons'
import * as iconsModel from './model.icons'

const { Model } = iconsModel

const createIconDocument = async (payload: IconInterface) => {
  await Model.create(payload)
}

const getAllIcons = async () => {
  const allIcons = await Model.find({})
  return allIcons
}
export {
  createIconDocument,
  getAllIcons
}
