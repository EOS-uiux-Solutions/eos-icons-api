import path from 'path'

// *********************************
// Grunt - Files Paths:
// *********************************

export const FILES_PATHS = {
  FILLED_SVG: 'svg/',
  OUTLINED_SVG: 'svg-outlined/',
  OUTLINED_TEMP: 'svg-outlined-temp/',
  FILLED_TEMP: 'svg-temp/'
}

// *********************************
// Directories used in APIs (V1)
// *********************************

export const tempDirectory = path.join(__dirname, '..', '/temp')
export const svgDirectory = path.join(__dirname, '..', '/svg')
export const outlinedDirectory = path.join(__dirname, '..', '/svg-outlined')
