import { ExportType, customizedConfig } from 'contracts/types'

export interface AnalyticsModelInterface {
    customizationConfig: customizedConfig,
    customized: boolean,
    timestamp: Date,
    icons: string[],
    format: ExportType
  }
