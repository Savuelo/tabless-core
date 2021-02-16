export interface ColumnConfig {
  columnName: string,
  columnIndex: string | number,
  columnFormat?: Function,
  columnClassName?: string,
}
export interface ColumnCell { 
  value: string,
  className: string,
}
export interface TableConfig{
  addOrdinalNumber?: boolean,
  ordinalHeader?: string,
  ordinalColumnClassName?: string,
}