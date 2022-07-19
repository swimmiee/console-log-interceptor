"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../../src"));
const chalk_1 = __importDefault(require("chalk"));
describe("interceptor test", function () {
    it("README.md overview", function () {
        src_1.default.intercept(); // start intercept
        console.log("Hello, World!");
        console.log("Now i am logging...");
        src_1.default.stopIntercept();
        const logs = src_1.default.get();
        console.log(logs);
    });
    it("README.md save", function () {
        // interceptor.intercept()
        // console.log(
        //     chalk.blue("Hello!!!")
        // )
        // interceptor.stopIntercept()
        src_1.default.intercept(); // start intercept
        console.log("Hello, World!");
        console.log("logging...");
        src_1.default.stopIntercept();
        src_1.default.save({
            path: "logs/mylog.log",
            append: true,
            header: "--- START LOG ---",
            footer: "--- END LOG ---"
        });
    });
    it("README.md chalk ignored", function () {
        src_1.default.intercept();
        console.log(chalk_1.default.blue("Hello!!!"));
        src_1.default.stopIntercept();
        src_1.default.save({
            path: "logs/chalk-ignored.log", // directory will be auto-generated
        });
    });
});
