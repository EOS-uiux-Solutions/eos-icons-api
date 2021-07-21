// *********************************
// Icons Controller interfaces:
// *********************************

import { CustomizedConfig, iconsThemeV1 } from 'common/types'

export interface GetSvgCodePayload {
iconArray: string[],
customizationConfig: CustomizedConfig,
theme: iconsThemeV1
}
