import analyticsModel from 'models'

const { Model } = analyticsModel

const createAnalyticDocument = async (payload: analyticsModel.IAnalytics) => {
  await Model.create(payload)
}

export {
  createAnalyticDocument
}
