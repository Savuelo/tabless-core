import { ColumnConfig, Cell } from '../models/Interfaces';
export declare const createDataCell: (row: any, columnConfig: ColumnConfig) => Cell;
export declare const createCellFromRawData: (value: string | undefined, className: string | undefined) => Cell;
