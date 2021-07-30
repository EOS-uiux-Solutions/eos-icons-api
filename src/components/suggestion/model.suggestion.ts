import mongoose, { Schema } from 'mongoose'
import { SuggestionsInterface } from './interfaces.suggestion'

const suggestSchema = new Schema({
  type: { type: String, required: true },
  suggestion: { type: String, required: true },
  status: { type: String, required: true }
})

// Main Schema:
const suggestionsSchema = new Schema({
  iconName: { type: String, required: true },
  suggestions: [suggestSchema]
})

// Indexes
suggestionsSchema.index({ iconName: 1, type: 1, status: 1 })

// the latter interface contains ORM-based functions such as save().
export interface SuggestionsModelI extends SuggestionsInterface { }

// The model:
export const Model = mongoose.model<SuggestionsModelI>('suggestions', suggestionsSchema)
