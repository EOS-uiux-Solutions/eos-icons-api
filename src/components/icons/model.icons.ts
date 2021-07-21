import { iconsTheme } from 'common/types'
import mongoose, { Schema } from 'mongoose'
import { IconInterface } from './interfaces.icons'

// Main Schema:
const iconsSchema = new Schema({
  name: { type: String, required: true },
  svg: { type: String, required: true },
  svgOutlined: String,
  do: { type: String, required: true },
  dont: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: Schema.Types.Mixed, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  svgModifiedAt: String,
  svgOutlinedModifiedAt: String,
  hasOutlined: Boolean,
  dateOutlined: String,
  label: String
})
// Indexes
iconsSchema.index({ name: 1 })
// the latter interface contains ORM-based functions such as save().
export interface IIconsModel extends IconInterface, mongoose.Document { }
// The model:
export const Model = mongoose.model<IIconsModel>('icons', iconsSchema)

export type svgFieldsInDB = 'svg' | 'svgOutlined'
// this method will be used to get the appropriate svg field, base on the theme
export const getAppropriateSVGField = (theme: iconsTheme) => {
  let field = 'svg'
  switch (theme) {
    case 'filled':
      break
    case 'outlined':
      field = 'svgOutlined'
      break
  }
  return field
}
