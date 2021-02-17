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
var Sorting_1 = require("./utilities/Sorting");
var TableBody_1 = require("./utilities/tableGenerating/TableBody");
var TableHeaders_1 = require("./utilities/tableGenerating/TableHeaders");
var Tabless = /** @class */ (function () {
    function Tabless(columnsConfig, data, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
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
                var validIndex = columnsConfig.some(function (e) { return e.columnIndex === orderIndex_1; });
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
            var headers = TableHeaders_1.generateHeaders(columnsConfig, config); // array with column names;
            //create tableBody rows;
            var table = TableBody_1.generateTableBody(columnsConfig, data, config);
            //headers are always the first element of the table array;
            if (!config.headerless) {
                table.unshift(headers);
            }
            // table.unshift(headers)
            return _this.renderWay(table);
        };
        this.columnsConfig = columnsConfig;
        this.data = data;
        console.log("eeeeqeqefww");
        this.setConfig(config);
    }
    /*
      Updates current configuration with new configuration provided by user
    */
    Tabless.prototype.setConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
    };
    return Tabless;
}());
exports.default = Tabless;
