import mongoose, { Schema } from 'mongoose'

export interface InfoInterface {
  iconsAdded: string[],
  iconsDeleted: string[],
  iconsUpdated: string[],
  }

// Main Schema:
const InfoSchema = new Schema({
  iconsAdded: { type: [String], required: true },
  iconsDeleted: { type: [String], required: true },
  iconsUpdated: { type: [String], required: true }
}, {
  timestamps: true,
  collection: 'info'
})
// Indexes
InfoSchema.index({ createdAt: -1 })

// the latter interface contains ORM-based functions such as save().
interface IInfoModel extends InfoInterface, mongoose.Document { }
// The model:
export const Model = mongoose.model<IInfoModel>('info', InfoSchema)
