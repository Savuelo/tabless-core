import { ColumnConfig, TableConfig, TableRow } from './models/Interfaces';
export default class Tabless {
    columnsConfig: ColumnConfig[];
    data: any[];
    config: TableConfig;
    constructor(columnsConfig: ColumnConfig[], data: any[], config?: TableConfig);
    setConfig(newConfig: TableConfig): void;
    addRow(newRow: any, atBeginning?: boolean): void;
    updateRow(newRowValues: any, rowAbsoluteId: number): void;
    removeRow(rowAbsoluteId: number): void;
    removeMultipleRows(rowAbsoluteIds: number[]): void;
    renderWay: (_tableArray: TableRow[]) => null;
    render: () => null;
}
