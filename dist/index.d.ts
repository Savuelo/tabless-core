import { ColumnConfig, TableConfig, TableRow } from './models/Interfaces';
export default class Tabless {
    columnsConfig: ColumnConfig[];
    data: any[];
    config: TableConfig;
    constructor(columnsConfig: ColumnConfig[], data: any[], config?: TableConfig);
    setConfig(newConfig: TableConfig): void;
    addColumn(newColumn: ColumnConfig): void;
    removeColumnById(columnIdToRemove: string | number): void;
    removeColumnsByIndex(indexInArray: number | number[]): void;
    addRow(newRow: any, atBeginning?: boolean): void;
    updateRow(newRowValues: any, rowAbsoluteId: number): void;
    removeRows(absoluteIds: number[] | number): void;
    renderWay: (_tableArray: TableRow[]) => null;
    render: () => null;
}
