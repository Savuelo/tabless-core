"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeaders = void 0;
var CreatingCells_1 = require("./../CreatingCells");
/*
  returns an array of cells of header row;
*/
function generateHeaders(columnsConfig, config) {
    var _a, _b;
    var headers = [];
    // If ordinary cell is request add header
    if (config.addOrdinalNumber) {
        var value = (_a = config.ordinalHeader) !== null && _a !== void 0 ? _a : 'No.';
        var className = (_b = config.ordinalColumnClassName) !== null && _b !== void 0 ? _b : 'ordinal';
        var ordinaryHeaderCell = CreatingCells_1.createCellFromRawData(value, className);
        headers.push(ordinaryHeaderCell);
    }
    //create header cell
    columnsConfig.forEach(function (_a) {
        var columnName = _a.columnName, columnClassName = _a.columnClassName;
        var headerCell = CreatingCells_1.createCellFromRawData(columnName, columnClassName);
        headers.push(headerCell);
    });
    return headers;
}
exports.generateHeaders = generateHeaders;
