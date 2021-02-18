import { ColumnConfig } from './../models/Interfaces';
export declare const isFunction: (functionToTest: Function) => boolean;
export declare const isObjectEmpty: (object: any) => any;
export declare const isObjectValid: (object: any) => any;
export declare const isColumnConfigValid: (column: ColumnConfig) => any;
export declare const removeInvalidColumns: (columns: ColumnConfig[]) => ColumnConfig[];
export declare const removeInvalidRows: (array: any) => any;
export declare const removeRequestedIndexes: (array: any[], indexes: number | number[]) => any[];
