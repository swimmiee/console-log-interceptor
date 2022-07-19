import fs from 'fs-extra'
import { ConsoleLog, InterceptorDatetimeOption, InterceptorOption, Log, SaveLogOptions } from './types'

export class LogInterceptor {
    private origin: ConsoleLog
    private logs: Log[]
    private datetimeOption: InterceptorDatetimeOption | null

    constructor(){
        this.origin = console.log;
        this.logs = [];
        this.datetimeOption = null;
    }

    public clear(){
        this.logs = []
    }

    public intercept(option?:InterceptorOption){
        this.datetimeOption = option?.datetime || null;
        this.clear()

        // redefine console.log
        console.log = (...data:any[]) => {
            this._appendLog(data);
            this.origin(...data);
        }
    }

    public stopIntercept(clear?: boolean){
        // take back to the original console.log
        console.log = this.origin;
        this.datetimeOption = null;
        if(clear) 
            this.clear();
    }

    private _appendLog(...data:any[]){
        const log = data
            .map(d => (d+"").replace(/\x1B\[[0-9]*m/gi,"")) // remove console color
            .filter(Boolean)
            .join(' ')


        this.logs.push({
            timestamp: new Date().getTime(),
            log
        })
    }

    public get(){
        return this.logs.map(logData => {
            const {timestamp, log} = logData;
            if(this.datetimeOption){
                const date = new Date(timestamp);
                const formatted = this.datetimeOption.format ? 
                    this.datetimeOption.format(date)
                    :
                    `[${(date as Date).toLocaleString()}] `
                return formatted + log
            }
            else {
                return log
            }
        })
    }

    public save(options:SaveLogOptions){
        const slashIndex = options.path.lastIndexOf('/')
        const dir = options.path.slice(0, slashIndex)
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true})
        }

        const logs = this.get()
        const header = options.header ? options.header+'\n' : ""
        const footer = options.footer ? '\n' + options.footer + '\n\n' : ""

        const data = options.json ? 
            JSON.stringify(logs, options.json.replacer, options.json.space)
            :
            header + logs.join('\n') + (footer || (logs.length > 0 ? '\n\n' : ''));
        
            
        fs.writeFileSync(
            options.path, 
            data, 
            {encoding: 'utf-8', flag: options.append ? 'a' :'w'}
        )

        if(options.clear)
            this.clear();
    }
}