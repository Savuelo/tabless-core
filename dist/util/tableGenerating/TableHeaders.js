"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeaders = void 0;
var CreatingCells_1 = require("../CreatingCells");
/*
  Returns TableRow Object with headers Cells
*/
function generateHeaders(columnsConfig, config) {
    var _a, _b;
    var header = {
        absoluteId: -1,
        cells: []
    };
    // If ordinary cell is request add header
    if (config.addOrdinalNumber) {
        var value = (_a = config.ordinalHeader) !== null && _a !== void 0 ? _a : 'No.';
        var className = (_b = config.ordinalColumnClassName) !== null && _b !== void 0 ? _b : 'ordinal';
        var ordinaryHeaderCell = CreatingCells_1.createCellFromRawData(value, className);
        header.cells.push(ordinaryHeaderCell);
    }
    //create header cell
    columnsConfig.forEach(function (e) {
        if (!e)
            return;
        var columnName = e.columnName, columnClassName = e.columnClassName;
        var headerCell = CreatingCells_1.createCellFromRawData(columnName, columnClassName);
        header.cells.push(headerCell);
    });
    return header;
}
exports.generateHeaders = generateHeaders;
