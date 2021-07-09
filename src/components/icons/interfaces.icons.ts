import { CustomizedConfig } from 'common/types'
import mongoose from 'mongoose'

export type iconType = 'animated' | 'static'

// Interface of the icons objects stored in db:
export interface IconInterface extends mongoose.Document{
    name: string,
    svg: string,
    tags: string[],
    category: string | string[],
    type: iconType,
    date: string,
    do:string,
    dont: string,
    svgOutlined?:string,
    hasOutlined?: boolean,
    dateOutlined?: string,
    label?: string
    }

export interface getStringPayload {
    stringType: string,
    icons: string[],
    customizations?:CustomizedConfig
}
