# console-log-interceptor
console.log interceptor for grab your console.logs

## Installation
```
npm i console-log-interceptor
```

## Usage
```typescript
import interceptor from "console-log-interceptor"

interceptor.intercept()    // start intercept
console.log("Hello, World!")
console.log("logging...")
interceptor.stopIntercept() 

const logs = interceptor.get()  // [ 'Hello, World!', 'logging...' ]
``` 

## Save Logs
```typescript
interceptor.intercept()    // start intercept
console.log("Hello, World!")
console.log("logging...")
interceptor.stopIntercept() 

interceptor.save({
    path: "logs/mylog.log",   // directory will be auto-generated
    append: true,
    header: "--- START LOG ---",
    footer: "--- END LOG ---"
})
```

#### OUTPUT
at  `./logs/mylog.log`
```
--- START LOG ---
Hello, World!
logging...
--- END LOG ---
```

## CHALK-IGNORED
```typescript
interceptor.intercept()
console.log(
    chalk.blue("Hello!!!")
)
interceptor.stopIntercept()

interceptor.save({
    path: "logs/chalk-ignored.log"
})
```
#### OUTPUT
at  `./logs/chalk-ignored.log`
```
Hello!!!
```