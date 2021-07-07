/* eslint-disable no-unused-vars */
// *********************************
// Icons Payload and customizations:
// *********************************

// Allowed export types:
export type ExportType = 'png' | 'svg' | 'font';

// The allowed flip properties:
export interface FlipObject {
    horizontal: boolean,
    vertical: boolean
}

// The allowed customization configs:
export interface CustomizedConfig {
    colorCode?: string,
    rotateAngle?: number,
    size?: number
    flip?: FlipObject
}

// IconsPayload:
export interface IconsPayload {
    icons: string[]
}

// Icons with customization configs payload:
export interface CustomizedIconsPayload extends IconsPayload {
    exportAs?: ExportType,
    exportSize?: number,
    customizationConfig?: CustomizedConfig
}

// *********************************
// Themes:
// *********************************

// Available themes:
export enum iconsTheme {
    filled,
    outlined
}

// Backward compatability for V1 APIs: 
export enum iconsThemeV1 {
    'svg' = 'svg',
    'outlined' = 'outlined'
}

// A dictionary with the themes as a keys:
export type themesDictionary = {
    [K in iconsTheme]: string;
}
