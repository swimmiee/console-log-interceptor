import path from "path"
import interceptor from "../../src"
import chalk from "chalk"

describe("interceptor test", function(){
    interceptor.intercept()
    console.log(
        chalk.blue("Hello!!!")
    )
    interceptor.stopIntercept()

    console.log(interceptor.get())
    interceptor.save({
        path: "logs/asd.log",
        append: true,
        footer: "ASDADASD"
    })
})