import configs from 'configs'
import { connect } from 'mongoose'
import { NodeLogger } from 'helpers'
const { Databases } = configs

const connectionConfigs = {
  url: Databases.MongoURI,
  options: {
    // To fix the deprecations messages: see
    // https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}

const mongoDBconnector = async () => {
  try {
    await connect(connectionConfigs.url, connectionConfigs.options)
    console.log('Database connection has been established successfully')
  } catch (err) {
    NodeLogger.logError('MongoDB connector', err)
  }
}

export default mongoDBconnector
