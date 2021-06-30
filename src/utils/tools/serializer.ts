import { ExportType, CustomizedIconsPayload } from 'common/types'
import { analyticsModel } from 'components/analytics'

const serializer = (payload: CustomizedIconsPayload, format: ExportType, customized: boolean = false) => {
  const data: analyticsModel.AnalyticsInterface = {
    customizationConfig: {
      colorCode: '',
      rotateAngle: 0,
      flip: { horizontal: false, vertical: false },
      size: 0
    },
    customized: customized,
    timestamp: Math.floor(Date.now()),
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
