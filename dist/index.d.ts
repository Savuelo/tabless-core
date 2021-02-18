import { ColumnConfig, TableConfig, TableRow } from './models/Interfaces';
export default class Tabless {
    columnsConfig: ColumnConfig[];
    data: any[];
    config: TableConfig;
    constructor(columnsConfig?: ColumnConfig[], data?: any[], config?: TableConfig);
    setConfig(newConfig: TableConfig): void;
    getColumns(): ColumnConfig[];
    getData(): any[];
    replaceColumns(newColumnsSet: ColumnConfig[]): void;
    replaceData(newData: any): void;
    addColumns(newColumns: ColumnConfig[] | ColumnConfig): void;
    removeColumnsById(columnIdsToRemove: string | string[] | number | number[]): void;
    removeColumnsByIndex(indexInArray: number | number[]): void;
    addRows(newRows: any | any[], atBeginning?: boolean): void;
    updateRow(newRowValues: any, rowAbsoluteId: number): void;
    removeRows(absoluteIds: number[] | number): void;
    renderWay: (_tableArray: TableRow[]) => null;
    render: () => null;
}
