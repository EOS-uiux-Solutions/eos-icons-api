// *********************************
// Icons Payload and customizations:
// *********************************

// Allowed export types
export type ExportType = 'png' | 'svg' | 'font';

// The allowed flip properties:
interface flipObject {
    horizontal: boolean,
    vertical: boolean
}

// The allowed customization configs:
export interface customizedConfig {
    colorCode?: string,
    rotateAngle?: number,
    size?: number
    flip?: flipObject
}

// IconsPayload:
export interface iconsPayload {
    icons: string[]
}

// Icons with customization configs payload:
export interface customizedIconsPayload extends iconsPayload {
    exportAs?: ExportType,
    exportSize?: number,
    customizationConfig?: customizedConfig
}