import { ExportType, customizedIconsPayload } from 'contracts/types'
import { AnalyticsModelInterface } from 'models'

const serializer = (payload: customizedIconsPayload, format: ExportType, customized: boolean = false) => {
  const data: AnalyticsModelInterface = {
    customizationConfig: {
      colorCode: '',
      rotateAngle: 0,
      flip: { horizontal: false, vertical: false },
      size: 0
    },
    customized: customized,
    timestamp: new Date(),
    icons: payload.icons,
    format: format
  }

  if (customized) {
    data.customizationConfig = payload.customizationConfig!
    data.customizationConfig.size = payload.exportSize
  }
  return data
}

export default serializer
