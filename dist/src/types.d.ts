export declare type ConsoleLog = (...data: any[]) => void;
export interface InterceptorDatetimeOption {
    format?: (date: Date) => string;
}
export interface InterceptorOption {
    datetime?: InterceptorDatetimeOption | null;
}
export interface JSONStringifyOptions {
    replacer?: (number | string)[] | null;
    space?: string | number;
}
export interface SaveLogOptions {
    path: string;
    append: boolean;
    json?: false | JSONStringifyOptions;
    clear?: boolean;
    header?: string;
    footer?: string;
}
export interface Log {
    timestamp: number;
    log: string;
}
//# sourceMappingURL=types.d.ts.map