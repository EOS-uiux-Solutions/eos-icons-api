import { Suggestion } from './interfaces.suggestion'
import * as suggestionsModel from './model.suggestion'

const { Model } = suggestionsModel

const getIconSuggestions = async (iconName: string) => {
  const suggestionsInfo = await Model.findOne({ iconName }, 'suggestions').lean()
  return suggestionsInfo
}

const addSuggestions = async (iconName: string, suggestionsInfo: Suggestion[]) => {
  const update = { iconName, $addToSet: { suggestions: { $each: suggestionsInfo } } }
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }
  const updated = await Model.findOneAndUpdate({ iconName }, update, options)
  return updated
}

export {
  addSuggestions,
  getIconSuggestions
}
