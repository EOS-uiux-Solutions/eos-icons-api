/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'

export enum suggestionStatus {
    pending = 'pending',
    rejected = 'rejected'
}

export enum suggestionType {
    tags = 'tags',
    category = 'category',
}

export interface Suggestion {
    type: suggestionType,
    suggestion: string,
    status: suggestionStatus,
}

// Interface of the suggestions objects stored in db:
export interface SuggestionsInterface extends mongoose.Document{
    iconName: string
    suggestions: Suggestion[]
}
