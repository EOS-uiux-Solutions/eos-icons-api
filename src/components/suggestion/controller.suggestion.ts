import Filter from 'bad-words'
import { IconInterface, iconsServices } from 'components/icons'
import { redisClient } from 'databases'
import Express from 'express'
import { HTTPException, Logger, respond } from 'helpers'
import { redisTools } from 'utils/tools'
import { Suggestion, suggestionStatus } from './interfaces.suggestion'
import * as suggestionServices from './service.suggestion'

const suggestionLogger = new Logger('Suggestions Logger')

const addSuggestion = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { iconName, suggestion, type } = req.body
    const filter = new Filter()
    // the suggestion is comma separated, and a filter is added to remove the empty strings
    const suggestions = suggestion.split(',').filter((el: string) => el.length !== 0)
    if (filter.isProfane(suggestion)) {
      throw new HTTPException(400, 'The suggestion contains a blacklisted word')
    }

    const iconInfo = await iconsServices.getSetOfIcons([iconName], type)
    const iconSuggestions = await suggestionServices.getIconSuggestions(iconName)
    const existentData = iconInfo[0][type]
    const suggestedData: string[] = []
    // if this the first suggestions, the db will respond with null
    if (iconSuggestions) {
      iconSuggestions.suggestions.forEach((element: Suggestion) => {
        if (element.type === type) { suggestedData.push(element.suggestion) }
      })
    }

    const alreadyExisted: string[] = []
    const alreadySuggested: string[] = []
    const preparedSuggestions: Suggestion[] = []

    suggestions.forEach(element => {
      const trimmed = element.trim()
      if (existentData.includes(trimmed)) {
        alreadyExisted.push(trimmed)
      } else if (suggestedData && suggestedData.includes(trimmed)) {
        alreadySuggested.push(trimmed)
      } else {
        preparedSuggestions.push({ suggestion: trimmed, type, status: suggestionStatus.pending })
      }
    })

    if (alreadyExisted.length || alreadySuggested.length) {
      throw new HTTPException(409, `[ ${alreadyExisted} ] is already existed, [ ${alreadySuggested} ] is already suggested`)
    }

    await suggestionServices.addSuggestions(iconName, preparedSuggestions)
    respond(200, 'suggestions added successfully', res)
  } catch (err) {
    suggestionLogger.logError('addSuggestion', err)
    next(err)
  }
}

const getAllSuggestions = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const status = req.query.status as suggestionStatus
    const suggestions = await suggestionServices.getAllSuggestions(status)
    respond(200, suggestions, res)
  } catch (err) {
    suggestionLogger.logError('getAllSuggestions', err)
    next(err)
  }
}

const decide = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { type, status, iconName, suggestions } = req.body
    const updatePromises: Promise<any>[] = []
    if (status === suggestionStatus.approved) {
      const updatedIcon = await iconsServices.addSuggested(iconName, type, suggestions) as IconInterface
      // overwrite the cached key:
      const serializedIcon = redisTools.serialize(updatedIcon)
      await redisTools.asyncRedis.hset(redisClient!, iconName, type, serializedIcon[type])
    }

    suggestions.forEach((suggestion: string) => {
      const updated = suggestionServices.updateStatus(type, iconName, status, suggestion)
      updatePromises.push(updated)
    })
    await Promise.all(updatePromises)

    respond(200, 'Updated successfully', res)
  } catch (err) {
    suggestionLogger.logError('decide', err)
    next(err)
  }
}

export {
  addSuggestion,
  getAllSuggestions,
  decide
}
