/* eslint-disable no-unused-vars */

export type iconType = 'animated' | 'static'

// Interface of the icons objects stored in db:
export interface IconInterface {
    name: string,
    svg: string,
    tags: string[],
    category: string | string[],
    type: iconType,
    date: string,
    do?:string,
    dont?: string,
    svgOutlined?:string,
    hasOutlined?: boolean,
    dateOutlined?: string,
    label?: string
    }
