import { isFunction } from './utilities';
export var createDataCell = function (row, columnConfig) {
    var _a;
    var columnIndex = columnConfig.columnIndex, columnClassName = columnConfig.columnClassName, columnFormat = columnConfig.columnFormat;
    var value = (_a = row[columnIndex]) !== null && _a !== void 0 ? _a : ''; //Value of cell;
    var className = columnClassName !== null && columnClassName !== void 0 ? columnClassName : ''; //className of cell;
    //Merge values intro Cell Object;
    var cell = createCellFromRawData(value, className);
    //format value by user provided format function
    if (columnFormat && isFunction(columnFormat)) {
        cell.value = columnFormat(cell.value);
    }
    return cell;
};
//Creates cell, requires only value and className as raw data;
export var createCellFromRawData = function (value, className) {
    var cell = {
        value: value !== null && value !== void 0 ? value : '',
        className: className !== null && className !== void 0 ? className : '',
    };
    return cell;
};
