"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatter = void 0;
function dateFormatter(date, pattern) {
    const dateString = pattern.replace(/(YYYY|yyyy|YY|yy|MM|dd|DD|HH|mm|ss|SSS)/g, function (match) {
        let matchString = "";
        switch (match) {
            case "YYYY":
            case "yyyy":
                matchString = date.getFullYear() + "";
                break;
            case "YY":
            case "yy":
                matchString = (date.getFullYear() % 1000) + "";
                break;
            case "MM":
                matchString = date.getMonth() + 1 + "";
                break;
            case "DD":
            case "dd":
                matchString = date.getDate() + "";
                break;
            case "HH":
                matchString = date.getHours() + "";
                break;
            case "mm":
                matchString = date.getMinutes() + "";
                break;
            case "ss":
                matchString = date.getSeconds() + "";
                break;
            case "SSS":
                matchString = date.getMilliseconds() + "";
                break;
            default:
                matchString = match;
                break;
        }
        if (match == "SSS") {
            if (+matchString < 10) {
                matchString = "00" + matchString;
            }
            else if (+matchString < 100) {
                matchString = "0" + matchString;
            }
        }
        else {
            if (+matchString < 10) {
                matchString = "0" + matchString;
            }
        }
        return matchString;
    });
    return dateString;
}
exports.dateFormatter = dateFormatter;
