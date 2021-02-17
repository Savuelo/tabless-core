import { ColumnConfig, TableConfig, Cell } from './models/Interfaces';
export default class Tabless {
    columnsConfig: ColumnConfig[];
    data: any[];
    config: TableConfig;
    constructor(columnsConfig: ColumnConfig[], data: any[], config?: TableConfig);
    setConfig(newConfig: TableConfig): void;
    renderWay: (_tableArray: Cell[][]) => null;
    render: () => null;
}
