"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTableBody = void 0;
var CreatingCells_1 = require("../CreatingCells");
var utilities_1 = require("../utilities");
/*
  Returns array of TableRows of table data;

  Data is formated with provided functions;
  if no function formater is provided by end user saves raw data;
*/
function generateTableBody(columnsConfig, data, config) {
    var table = []; //Temp variable with 2d array of rows and columns data;
    // for Each - every table ROW
    var currentOrdinal = 1;
    data.forEach(function (sourceObject, index) {
        var _a;
        //Check is sourceObject valid object
        if (!utilities_1.isObjectValid(sourceObject)) {
            return;
        }
        var row = {
            absoluteId: index,
            cells: [],
        };
        // Add ordinal number if user provided that request in config
        if (config.addOrdinalNumber) {
            var ordinalNumber = currentOrdinal; //Ordinal number of that row
            currentOrdinal++;
            var className = (_a = config.ordinalColumnClassName) !== null && _a !== void 0 ? _a : 'ordinal';
            var cell = CreatingCells_1.createCellFromRawData(ordinalNumber.toString(), className);
            row.cells.push(cell);
        }
        //  for loop; calls for every column in table (in specific row)
        columnsConfig.forEach(function (columnConfig) {
            if (!columnConfig)
                return;
            var cell = CreatingCells_1.createDataCell(sourceObject, columnConfig);
            row.cells.push(cell);
        });
        table.push(row);
    });
    return table;
}
exports.generateTableBody = generateTableBody;
