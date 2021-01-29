"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feature_1 = __importDefault(require("./feature"));
function add(num1, num2) {
    return num1 + num2;
}
new feature_1.default();
console.log(add("any type  => ", 3));
