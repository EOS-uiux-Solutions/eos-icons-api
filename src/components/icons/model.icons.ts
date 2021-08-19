import { iconsTheme } from 'common/types'
import mongoose, { Schema } from 'mongoose'
import { IconInterface } from './interfaces.icons'

// Main Schema:
const iconsSchema = new Schema({
  name: { type: String, required: true },
  svg: { type: String, required: true },
  base64: { type: String, required: true },
  base64Outlined: { type: String, required: true },
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
export interface IIconsModel extends IconInterface { }
// The model:
export const Model = mongoose.model<IIconsModel>('icons', iconsSchema)

export type svgFieldsInDB = 'svg' | 'svgOutlined'
export type base64FieldsInDB = 'base64' | 'base64Outlined'
// this method will be used to get the appropriate svg field, based on the theme
export const getAppropriateSVGField = (theme: iconsTheme) => {
  let field = 'svg'
  switch (theme) {
    case iconsTheme.filled:
      break
    case iconsTheme.outlined:
      field = 'svgOutlined'
      break
  }
  return field
}

// this method will be used to get the appropriate base64 field, based on the theme
export const getAppropriateBase64Field = (theme: iconsTheme) => {
  let field = 'base64'
  switch (theme) {
    case iconsTheme.filled:
      break
    case iconsTheme.outlined:
      field = 'base64Outlined'
      break
  }
  return field
}
