"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInterceptor = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
class LogInterceptor {
    constructor() {
        this.origin = console.log;
        this.logs = [];
        this.datetimeOption = null;
    }
    clear() {
        this.logs = [];
    }
    intercept(option) {
        this.datetimeOption = (option === null || option === void 0 ? void 0 : option.datetime) || null;
        this.clear();
        // redefine console.log
        console.log = (...data) => {
            this._appendLog(data);
            this.origin(...data);
        };
    }
    stopIntercept(clear) {
        // take back to the original console.log
        console.log = this.origin;
        this.datetimeOption = null;
        if (clear)
            this.clear();
    }
    _appendLog(...data) {
        const log = data
            .map(d => (d + "").replace(/\x1B\[[0-9]*m/gi, "")) // remove console color
            .filter(Boolean)
            .join(' ');
        this.logs.push({
            timestamp: new Date().getTime(),
            log
        });
    }
    get() {
        return this.logs.map(logData => {
            const { timestamp, log } = logData;
            if (this.datetimeOption) {
                const date = new Date(timestamp);
                const formatted = this.datetimeOption.format ?
                    this.datetimeOption.format(date)
                    :
                        `[${date.toLocaleString()}] `;
                return formatted + log;
            }
            else {
                return log;
            }
        });
    }
    save(options) {
        const slashIndex = options.path.lastIndexOf('/');
        const dir = options.path.slice(0, slashIndex);
        if (!fs_extra_1.default.existsSync(dir)) {
            fs_extra_1.default.mkdirSync(dir, { recursive: true });
        }
        const logs = this.get();
        const header = options.header ? options.header + '\n' : "";
        const footer = options.footer ? '\n' + options.footer + '\n\n' : "";
        const data = options.json ?
            JSON.stringify(logs, options.json.replacer, options.json.space)
            :
                header + logs.join('\n') + (footer || (logs.length > 0 ? '\n\n' : ''));
        fs_extra_1.default.writeFileSync(options.path, data, { encoding: 'utf-8', flag: options.append ? 'a' : 'w' });
        if (options.clear)
            this.clear();
    }
}
exports.LogInterceptor = LogInterceptor;
