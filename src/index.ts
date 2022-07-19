import { LogInterceptor } from "./interceptor";

export * from "./interceptor"
export * from "./types"
const interceptor = new LogInterceptor()
export default interceptor