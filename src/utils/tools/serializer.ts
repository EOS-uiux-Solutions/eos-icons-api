import { ExportType } from 'contracts/types'
const serializer = (payload: any, format: ExportType, customized: boolean = false) => {
  const data = {
    customizationConfig: {},
    customized: customized,
    timestamp: new Date(),
    icons: payload.icons,
    format: format,
    location: undefined
  }

  if (customized) {
    data.customizationConfig = payload.customizationConfig
  }
  return data
}

export default serializer
