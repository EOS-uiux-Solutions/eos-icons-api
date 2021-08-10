import Joi from 'joi'

const addSuggestion = Joi.object({
  iconName: Joi.string().required(),
  type: Joi.string().valid('tags', 'category').required(),
  suggestion: Joi.string().required()
})

const decide = Joi.object({
  iconName: Joi.string().required(),
  type: Joi.string().valid('tags', 'category').required(),
  suggestions: Joi.array().items(Joi.string()),
  status: Joi.string().valid('approved', 'rejected').required()
})

export {
  addSuggestion,
  decide
}
