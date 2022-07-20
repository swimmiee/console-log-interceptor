
export type ConsoleLog = (...data:any[]) => void

export interface InterceptorDatetimeOption {
    format?: string | ((date: Date) => string)
}
export interface InterceptorOption {
    datetime?: InterceptorDatetimeOption | null
}
export interface JSONStringifyOptions {
    replacer?: (number | string)[] | null
    space?: string | number
} 

export interface SaveLogOptions {
    path: string
    append?: boolean // default: true
    // print as json file. default: false
    json?: false | JSONStringifyOptions
    clear?: boolean // default: true
    header?: string
    footer?: string
}

export interface Log {
    timestamp: number
    log: string
}