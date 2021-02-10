export interface ColumnConfig {
  columnName: string,
  columnIndex: string | number,
  columnFormat?: Function,
  columnClassName?: string,
}
export interface ColumnField { 
  value: string,
  className: string,
}