"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortData = void 0;
var sortData = function (data, orderBy) {
    var sortedData = data.sort(function (a, b) {
        var _a, _b;
        //Values used to compare;
        var value1 = (_a = a[orderBy]) !== null && _a !== void 0 ? _a : '';
        var value2 = (_b = b[orderBy]) !== null && _b !== void 0 ? _b : '';
        //Trying to handle different data types
        if (!isNaN(value1) && !isNaN(value2)) {
            value1 = parseFloat(value1);
            value2 = parseFloat(value2);
            return value1 - value2;
        }
        else {
            if (value1.localeCompare) {
                return value1.localeCompare(value2.toString());
            }
            else if (value2.localeCompare) {
                return value2.localeCompare(value1.toString());
            }
            else {
                return 0;
            }
        }
    });
    return sortedData;
};
exports.sortData = sortData;
