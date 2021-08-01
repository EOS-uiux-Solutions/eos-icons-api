import { Suggestion, suggestionStatus } from './interfaces.suggestion'
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

const rejectSuggestion = async (iconName: string, suggestion: string) => {
  const update = { $set: { 'suggestions.$.status': suggestionStatus.rejected } }
  const updated = await Model.findOneAndUpdate({ iconName, 'suggestions.suggestion': suggestion }, update)
  return updated
}

export {
  addSuggestions,
  getIconSuggestions,
  getAllSuggestions,
  rejectSuggestion
}
