import { Actions } from "./actions"

type TableController ={
    type?: string,
    name?: string
    defaultValue?: any
    ariaLabel?:string
    placeholder?:string
    hasAdd?:boolean
    hasEdit?:boolean
    hasDelete?:boolean,
    actions?: Actions;
}
export type {TableController};