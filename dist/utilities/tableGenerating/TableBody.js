import { createDataCell, createCellFromRawData } from './../CreatingCells';
/*
  Prepares data ready to be mapped to table element;
  sets 2D array of ColumnField with columns and rows of table data;

  Data is formated with provided functions;
  if no function formater is provided by end user saves raw data;
*/
export function generateTableBody(columnsConfig, data, config) {
    var table = []; //Temp variable with 2d array of rows and columns data
    // for Each - every table ROW
    data.forEach(function (row, index) {
        var _a;
        var rowValues = [];
        // Add ordinal number if user provided that request in config
        if (config.addOrdinalNumber) {
            var currentOrdinal = index + 1;
            var className = (_a = config.ordinalColumnClassName) !== null && _a !== void 0 ? _a : 'ordinal';
            var cell = createCellFromRawData(currentOrdinal.toString(), className);
            rowValues.push(cell);
        }
        //  for loop; calls for every column in table (in specific row)
        columnsConfig.forEach(function (columnConfig) {
            var cell = createDataCell(row, columnConfig);
            rowValues.push(cell);
        });
        table.push(rowValues);
    });
    return table;
}