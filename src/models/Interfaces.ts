export interface ColumnConfig {
  columnName: string,
  columnIndex: string | number,
  columnFormat?: Function,
  columnClassName?: string,
}
export interface Cell { 
  value: string,
  className: string,
}
export interface TableRow { 
  absoluteId: number, 
  cells: Cell[]
}
export interface TableConfig{
  addOrdinalNumber?: boolean,
  ordinalHeader?: string,
  ordinalColumnClassName?: string,
  orderBy?: string,
  descending?: boolean,
  headerless?: boolean,
}