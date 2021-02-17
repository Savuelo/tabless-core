Format raw data into ease to handle table data.

> :warning: It's core version of tabless, ready to use implementations of tabless in e.g. React, Vue will be avaiable soon.
## Installing 
```bash
$ npm install @savuelo/tabless-core
```

```javascript
import Tabless from '@savuelo/tabless-core';
```
OR
```html
<script src="/bundle/tabless.js"></script>
```
## Running example

1: Install dependecies
```bash
$ npm install
```
2: Start server
```bash
$ npm run dev
```
3: Navigate to **/example/index.html** in your browser

## Usage

At first You should create object with configuration of columns in table.

```javascript
const columns = [ 
  {
    columnName: 'Name:', // Display name of column
    columnIndex: 'name', // index/property of object with data
  },
  {
    columnName: 'Lastname:',
    columnIndex: 'lastname',

    /*
      Format function what will be used to format data in column
      In this case all of the data in this column will be uppercased
    */
    columnFormat: (value) => {
      return value.toUpperCase();
    }
  }
];
```

#### Available column config options

###### Required:
**string** `columnName` : Name of the column (header name).   
**string** `columnIndex` : Index or property of data object.  

###### Optional:
**function** `columnFormat` : Function used to format data in the column.  
**string** `columnClassName` : Class name of the column.  

#### Example data
Note that empty objects will be skipped during generation of output Table.
```javascript
const data = [
  {
    name: 'Hubert', 
    lastname: 'Dziuda', 
  },
  {
    name: 'John',
    lastname: 'snow',
  },
  {
    name: 'John', 
    lastname: 'Smith', 
  },
  {
    name: 'Mark',
    lastname: 'Steward', 
  }
];
```
#### Create config object
Providing config object is optional.

```javascript
const config = {
  addOrdinalNumber: true, //Creates column with ordinal number
}
```
##### Avaiable config options
**bolean** `addOrdinalNumber` : default **false**, add optional column with ordinary numbery.  
**string** `ordinalHeader` : default **'No.'**, header of ordinary number column.  
**string** `ordinalColumnClassName` : default **'ordinal'**, class name of ordinal number column.  
**string** `orderBy` : default **'undefined'**, index/property of data object used in sorting. If not defined or property is not valid table won't be sorted.*
**boolean** `descending` : default **false**, set to true if you want to sort your table descending. Works only when `orderBy` config is set.    
**boolean** `headerless` : default **false**, set to true if you want to generate table array without header row (you still have to pass columnConfig!) Make sure you adjust implementation of the `renderWay` method.    


> :warning: * when sorting make sure that all of the data in column in table represents the same type.


#### Create instace of Tabless
```javascript
const tabless = new Tabless(columns, data, config);
```

#### Configuring existing Tabless instance
To change configuration of existing Tabless instance call `setConfig` method and pass config object. It will overwrite config options and effect every of future renders.
```javascript
tabless.setConfig({
  orderBy: 'age',
  descending: true,
})
```

#### Adding new row
To create new row in existing Tabless instance use `addRow` method. It accepts  2 params: Object with data of the new row, and boolean what decides about putting new row to the start or end of the table. Note that if you are using sorting data in Tabless new row will be sorted as normal row, even if you pass param that puts it on the start of the table.    
After adding new row you should re-render the table.

```javascript
// row to the table
tabless.addRow({
  name: 'Ron',
  lastname: 'Jenkins',
  age: 22,
}, true); //second parameter is true, so the new row will be added at the beginning of the table. 

```

#### Removing row
To remove row from array pass row's absolute id into `removeRow` method.
Be careful! This action may afftect absolute ids of other rows.
```javascript
tabless.removeRow(2);
```
#### Implement tabless in you environment

> :warning: It's core version of tabless, ready to use implementations of tabless in e.g. React, Vue will be avaiable soon.

Override `renderWay` function in your Tabless instance with your implementation. 

**renderWay** recives as param array with of TableRow objects (which store row id and array of cells in this row). Cells are object that store formated data ready to be displayed in table and their className (column dependent).  

**First** element of that array is headers row.

###### Table Row Object: 
**number** `absoluteId` : stores absoluteId of row (absolute id is index of that row in source data Array, for headers row it have value of '-1').      
**array** `cells` : array of Cells object.
###### Cell Object: 
**string** `value` : value of cell.    
**string** `className` : cell class name.   

**renderWay** should return ready to display table of any desired type.

#### Example of renderWay:
Code below is meant to work in browser environment.

> :warning: Code below is just simplified example! It's not optimised and do not follow rules of good coding.

```javascript
tabless.renderWay = (data) => {
  const tableElement = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  data.forEach(({cells}, i)=>{
    let elementType = 'td';

    if(i === 0){ // render first object as table header
      elementType = 'th';
    }

    const rowElement = document.createElement('tr');

    cells.forEach(({value, className})=>{
      const cell = document.createElement(elementType); //th or td

      cell.innerHTML = value;

      if(className){
        cell.classList.add(className);
      }
      rowElement.append(cell);
    });

    if(i === 0){ //put header into thead element 
      tableHead.append(rowElement);
    }else{
      tableBody.append(rowElement);
    }
  })

  tableElement.append(tableHead);
  tableElement.append(tableBody);

  return tableElement;
}
```

To execute code, call `render` method of your **Tabless** instance
```javascript
document.getElementById('id-of-element').append(tabless.render());
```