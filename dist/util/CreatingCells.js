"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellFromRawData = exports.createDataCell = void 0;
var utilities_1 = require("./utilities");
var createDataCell = function (row, columnConfig) {
    var _a;
    var columnIndex = columnConfig.columnIndex, columnClassName = columnConfig.columnClassName, columnFormat = columnConfig.columnFormat;
    var value = (_a = row[columnIndex]) !== null && _a !== void 0 ? _a : ''; //Value of cell;
    var className = columnClassName !== null && columnClassName !== void 0 ? columnClassName : ''; //className of cell;
    //Merge values intro Cell Object;
    var cell = exports.createCellFromRawData(value, className);
    //format value by user provided format function
    if (columnFormat && utilities_1.isFunction(columnFormat)) {
        cell.value = columnFormat(cell.value);
    }
    return cell;
};
exports.createDataCell = createDataCell;
//Creates cell, requires only value and className as raw data;
var createCellFromRawData = function (value, className) {
    var cell = {
        value: value !== null && value !== void 0 ? value : '',
        className: className !== null && className !== void 0 ? className : '',
    };
    return cell;
};
exports.createCellFromRawData = createCellFromRawData;
