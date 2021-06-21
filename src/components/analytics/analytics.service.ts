import * as analyticsModel from './analytics.model'

const { Model } = analyticsModel

const createAnalyticDocument = async (payload: analyticsModel.IAnalytics) => {
  if (process.env.NODE_ENV !== 'test') {
    await Model.create(payload)
  }
}

export {
  createAnalyticDocument
}
