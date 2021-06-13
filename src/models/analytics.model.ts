import { ExportType, customizedConfig } from 'common/types'

export interface AnalyticsModelInterface {
    customizationConfig: customizedConfig,
    customized: boolean,
    timestamp: Date,
    icons: string[],
    format: ExportType
  }
