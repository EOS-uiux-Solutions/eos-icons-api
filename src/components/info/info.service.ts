import * as infoModel from './info.model'

const { Model } = infoModel

const createInfoDocument = async (payload: infoModel.InfoInterface) => {
  if (process.env.NODE_ENV !== 'test') {
    await Model.create(payload)
  }
}

const getLatestVersionInfo = async () => {
  if (process.env.NODE_ENV !== 'test') {
    const latestDocument = await Model.find({}).sort({ createdAt: -1 }).limit(1)
    return latestDocument
  }
}

export {
  createInfoDocument,
  getLatestVersionInfo
}
