import mongoose, { Schema } from 'mongoose'
import { IconInterface } from './interfaces.icons'

// Main Schema:
const iconsSchema = new Schema({
  name: { type: String, required: true },
  svg: { type: String, required: true },
  do: { type: String, required: true },
  dont: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: Schema.Types.Mixed, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  hasOutlined: Boolean,
  dateOutlined: String,
  label: String
})
// Indexes
iconsSchema.index({ name: 1 })
// the latter interface contains ORM-based functions such as save().
interface IIconsModel extends IconInterface, mongoose.Document { }
// The model:
export const Model = mongoose.model<IIconsModel>('icons', iconsSchema)
