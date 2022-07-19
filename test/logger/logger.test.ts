import interceptor from "../../src"
import chalk from "chalk"

describe("interceptor test", function(){
    it("README.md overview", function(){
        interceptor.intercept()    // start intercept
        console.log("Hello, World!")
        console.log("Now i am logging...")
        interceptor.stopIntercept()
        const logs = interceptor.get()
        console.log(logs)
    })

    it("README.md save", function(){
        // interceptor.intercept()
        // console.log(
        //     chalk.blue("Hello!!!")
        // )
        // interceptor.stopIntercept()
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
    })


    it("README.md chalk ignored", function(){
        interceptor.intercept()
        console.log(
            chalk.blue("Hello!!!")
        )
        interceptor.stopIntercept()

        interceptor.save({
            path: "logs/chalk-ignored.log",   // directory will be auto-generated
        })
    })
})