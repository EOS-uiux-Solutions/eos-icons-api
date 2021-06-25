import mongoose, { Schema } from 'mongoose'
import { IconInterface } from './interfaces.icons'

// Main Schema:
const iconsSchema = new Schema({
  name: { type: String, required: true },
  do: { type: String, required: true },
  dont: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: Schema.Types.Mixed, required: true },
  type: String,
  date: { type: Schema.Types.Date, required: true },
  hasOutlined: { type: Boolean, required: true },
  dateOutlined: { type: Schema.Types.Date, required: true },
  label: { type: String, required: true }
})

// the latter interface contains ORM-based functions such as save().
interface IIconsModel extends IconInterface, mongoose.Document { }
// The model:
export const Model = mongoose.model<IIconsModel>('icons', iconsSchema)
