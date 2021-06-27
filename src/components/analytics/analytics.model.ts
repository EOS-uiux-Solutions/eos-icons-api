import mongoose, { Schema } from 'mongoose'
import { ExportType, customizedConfig } from 'common/types'

export interface analyticsInterface {
    customizationConfig?: customizedConfig,
    customized: boolean,
    timestamp: number,
    icons: string[],
    format: ExportType
  }

// Sub-schemas:
const flipSchema = new Schema({
  horizontal: Boolean,
  vertical: Boolean,
  flip: String
})

const customizationSchema = new Schema({
  colorCode: String,
  rotateAngle: Number,
  flip: flipSchema
})
// Main Schema:
const analyticsSchema = new Schema({
  customizationConfig: { type: customizationSchema, required: false },
  customized: { type: Boolean, required: true },
  timestamp: { type: Number, required: true },
  icons: { type: [String], required: true },
  format: { type: String, required: true }
})

// the latter interface contains ORM-based functions such as save().
interface IAnalyticsModel extends analyticsInterface, mongoose.Document { }
// The model:
export const Model = mongoose.model<IAnalyticsModel>('analytics', analyticsSchema)
