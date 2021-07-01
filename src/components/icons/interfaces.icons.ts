/* eslint-disable no-unused-vars */

export type iconType = 'animated' | 'static'

// Interface of the icons objects stored in db:
export interface IconInterface {
    name: string,
    svg: string,
    do:string,
    dont: string,
    tags: string[],
    category: string | string[],
    type: iconType,
    date: string,
    hasOutlined?: boolean,
    dateOutlined?: string,
    label?: string
    }
