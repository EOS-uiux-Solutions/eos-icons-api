import mongoose, { Schema } from 'mongoose'

export interface InfoInterface {
  iconsAdded: string[],
  iconsDeleted: string[],
  iconsUpdated: string[],
}

interface SchemaTimestamps {
  createdAt: Date
  updatedAt: Date
}

// Main Schema:
const infoSchema = new Schema({
  iconsAdded: { type: [String], required: true },
  iconsDeleted: { type: [String], required: true },
  iconsUpdated: { type: [String], required: true }
}, {
  timestamps: true,
  collection: 'info'
})
// Indexes
infoSchema.index({ createdAt: -1 })

// the latter interface contains ORM-based functions such as save().
export interface IInfoModel extends InfoInterface, SchemaTimestamps, mongoose.Document { }
// The model:
export const Model = mongoose.model<IInfoModel>('info', infoSchema)
