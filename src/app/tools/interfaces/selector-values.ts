export interface SelectorValue{
    display?: string,
    value: string|number|any|boolean,
    valueChange?: {
        type: 'number'|'string'|'date',
        min: number,
        max: number,
        proposedValue?: number|string     
    } 
}