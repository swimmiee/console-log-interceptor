import { InterceptorOption, SaveLogOptions } from './types';
export declare class LogInterceptor {
    private origin;
    private logs;
    private datetimeOption;
    constructor();
    clear(): void;
    intercept(option?: InterceptorOption): void;
    stopIntercept(clear?: boolean): void;
    private _appendLog;
    get(): string[];
    save(options: SaveLogOptions): void;
}
//# sourceMappingURL=interceptor.d.ts.map