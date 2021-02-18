"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sorting_1 = require("./util/Sorting");
var TableBody_1 = require("./util/tableGenerating/TableBody");
var TableHeaders_1 = require("./util/tableGenerating/TableHeaders");
var utilities_1 = require("./util/utilities");
var Tabless = /** @class */ (function () {
    function Tabless(columnsConfig, data, config) {
        var _this = this;
        if (columnsConfig === void 0) { columnsConfig = []; }
        if (data === void 0) { data = []; }
        if (config === void 0) { config = {}; }
        this.columnsConfig = []; //Configs of every column that table have 
        this.data = []; //Data displated in column
        this.config = {
            addOrdinalNumber: false,
            ordinalHeader: 'No.',
            ordinalColumnClassName: 'ordinal',
            orderBy: undefined,
            descending: false,
            headerless: false,
        };
        /*
          Method that will be overrided in other module;
          In core its just "virtual" like method;
      
          By default returns null;
        */
        this.renderWay = function (_tableArray) {
            return null;
        };
        /*
          Calls and returns value of renderWay method;
          Also passes to method values from this class;
          that allows to pass values as props when renderWay is overrieded by
          other method;
        */
        this.render = function () {
            var columnsConfig = _this.columnsConfig;
            var config = _this.config;
            var data = _this.data;
            //Handle sorting options
            if (_this.config.orderBy !== undefined) {
                var orderIndex_1 = _this.config.orderBy;
                //Find column by witch table will be sorted;
                var validIndex = columnsConfig.some(function (e) { return e && e.columnIndex === orderIndex_1; });
                //if matching column has been found; sort data 
                if (validIndex) {
                    data = Sorting_1.sortData(data, orderIndex_1);
                    //sort methods by default sorts data ascending.
                    //If descending option has been choosen, reverse data;
                    if (_this.config.descending) {
                        data = data.reverse();
                    }
                }
            }
            //Create headers row;    
            var header = TableHeaders_1.generateHeaders(columnsConfig, config); // array with column names;
            //create tableBody rows;
            var table = TableBody_1.generateTableBody(columnsConfig, data, config);
            // Skip adding headers if table is going to be headerlesss
            if (!config.headerless) {
                //headers are always the first element of the table array; 
                table.unshift(header);
            }
            // table.unshift(headers)
            return _this.renderWay(table);
        };
        this.columnsConfig = utilities_1.removeInvalidColumns(columnsConfig);
        this.data = utilities_1.removeInvalidRows(data);
        this.setConfig(config);
    }
    /*
      Updates current configuration with new configuration provided by user
    */
    Tabless.prototype.setConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
    };
    /*
      Return basic params of tabless
    */
    Tabless.prototype.getColumns = function () {
        return this.columnsConfig;
    };
    Tabless.prototype.getData = function () {
        return this.data;
    };
    /*
      Replace current columns config with new columns config set
    */
    Tabless.prototype.replaceColumns = function (newColumnsSet) {
        if (newColumnsSet && Array.isArray(newColumnsSet)) {
            this.columnsConfig = utilities_1.removeInvalidColumns(newColumnsSet);
        }
    };
    /*
      Replace current data object
    */
    Tabless.prototype.replaceData = function (newData) {
        this.data = utilities_1.removeInvalidRows(newData);
    };
    /*
      Add new column(s) to the table
    */
    Tabless.prototype.addColumns = function (newColumns) {
        var _this = this;
        if (!newColumns)
            return;
        var newColumnsArray = [];
        //Check is newColumns array or no
        if (!Array.isArray(newColumns)) {
            newColumnsArray = [newColumns];
        }
        else {
            newColumnsArray = newColumns;
        }
        newColumnsArray.forEach(function (element) {
            if (utilities_1.isColumnConfigValid(element)) {
                _this.columnsConfig.push(element);
            }
        });
    };
    /*
      Remove column by its id (userProvided id)
    */
    Tabless.prototype.removeColumnsById = function (columnIdsToRemove) {
        if (!columnIdsToRemove)
            return;
        this.columnsConfig = this.columnsConfig.filter(function (_a) {
            var columnId = _a.columnId;
            if (Array.isArray(columnIdsToRemove)) {
                //If passed an array as param, check if any in in that array is equal with this columnId;
                //Note that output of some is negated! (> ! <)
                return !columnIdsToRemove.some(function (idToRemove) {
                    return columnId == idToRemove;
                });
            }
            else {
                //If passed just number or string compare and remove.
                return columnId != columnIdsToRemove;
            }
        });
    };
    /*
      Remove column by its index in array;
    */
    Tabless.prototype.removeColumnsByIndex = function (indexInArray) {
        this.columnsConfig = utilities_1.removeRequestedIndexes(this.columnsConfig, indexInArray);
    };
    /*
      Add new row to existing table;
      if new row will be added at beggining it will affect other rows absolute id
    */
    Tabless.prototype.addRows = function (newRows, atBeginning) {
        var _a, _b;
        if (atBeginning === void 0) { atBeginning = false; }
        if (utilities_1.isObjectValid(newRows)) {
            var rowsArray = [];
            //Adjust type
            if (!Array.isArray(newRows)) {
                rowsArray = [newRows];
            }
            else {
                rowsArray = newRows;
            }
            if (atBeginning) {
                (_a = this.data).unshift.apply(_a, rowsArray);
            }
            else {
                (_b = this.data).push.apply(_b, rowsArray);
            }
        }
    };
    /*
      Updates existing row with new data;
    */
    Tabless.prototype.updateRow = function (newRowValues, rowAbsoluteId) {
        if (isNaN(rowAbsoluteId))
            return;
        if (rowAbsoluteId >= 0 && rowAbsoluteId < this.data.length) {
            if (utilities_1.isObjectValid(newRowValues)) {
                this.data[rowAbsoluteId] = __assign(__assign({}, this.data[rowAbsoluteId]), newRowValues);
            }
        }
    };
    /*
      Remove multiple rows at once
    */
    Tabless.prototype.removeRows = function (absoluteIds) {
        this.data = utilities_1.removeRequestedIndexes(this.data, absoluteIds);
    };
    return Tabless;
}());
exports.default = Tabless;
