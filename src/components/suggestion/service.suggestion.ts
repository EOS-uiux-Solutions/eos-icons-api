import { Suggestion, suggestionStatus, suggestionType } from './interfaces.suggestion'
import * as suggestionsModel from './model.suggestion'

const { Model } = suggestionsModel

const getAllSuggestions = async (status: suggestionStatus) => {
  const suggestions = await Model.find({ 'suggestions.status': status }).lean()
  return suggestions
}

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

const updateStatus = async (type: suggestionType, iconName: string, status: suggestionStatus, suggestion: string) => {
  const update = { $set: { 'suggestions.$.status': suggestionStatus[status] } }
  const updated = await Model.findOneAndUpdate({ iconName, 'suggestions.suggestion': suggestion, 'suggestions.type': type }, update)
  return updated
}

export {
  addSuggestions,
  getIconSuggestions,
  getAllSuggestions,
  updateStatus
}
