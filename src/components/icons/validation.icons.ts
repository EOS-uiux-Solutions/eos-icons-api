import Joi from 'joi'

const customizations = Joi.object({
  colorCode: Joi.string(),
  rotateAngle: Joi.number(),
  flip: Joi.object({
    horizontal: Joi.boolean(),
    vertical: Joi.boolean()
  })
})
const theme = Joi.string().valid('outlined', 'filled').required()
const icons = Joi.array().items(Joi.string()).min(1).required()

/// ////////////////////////////////////

const getIcons = Joi.object({
  color: Joi.string()
})

const getString = Joi.object({
  icons,
  customizations,
  theme,
  stringType: Joi.string().valid('base64', 'svg').required()
})

const getFont = Joi.object({
  icons,
  customizations,
  theme
})

const getFile = Joi.object({
  icons,
  theme,
  customizationConfig: customizations,
  exportAs: Joi.string().valid('svg', 'png').required(),
  exportSize: Joi.number().required()

})
export {
  getIcons,
  getString,
  getFont,
  getFile
}
