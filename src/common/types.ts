/* eslint-disable no-unused-vars */
// *********************************
// Icons Payload and customizations:
// *********************************

// Allowed export types:
export type ExportType = 'png' | 'svg' | 'font';

// The allowed flip properties:
export interface flipObject {
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

// *********************************
// Themes:
// *********************************

// Available themes:
export enum iconsTheme {
    outlined,
    svg
}

// A dictionary with the themes as a keys:
export type themesDictionary = {
    [K in iconsTheme]: string;
}
