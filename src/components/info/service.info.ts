import * as infoModel from './model.info'

const { Model } = infoModel

const createInfoDocument = async (payload: infoModel.InfoInterface) => {
  await Model.create(payload)
}

const getLatestVersionInfo = async (): Promise<infoModel.IInfoModel> => {
  const latestDocument = await Model.find({}).sort({ createdAt: -1 }).limit(1)
  return latestDocument[0]
}

export {
  createInfoDocument,
  getLatestVersionInfo
}
