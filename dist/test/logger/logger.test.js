"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../../src"));
const chalk_1 = __importDefault(require("chalk"));
describe("interceptor test", function () {
    src_1.default.intercept();
    console.log(chalk_1.default.blue("Hello!!!"));
    src_1.default.stopIntercept();
    console.log(src_1.default.get());
    src_1.default.save({
        path: "logs/asd.log",
        append: true,
        footer: "ASDADASD"
    });
});
