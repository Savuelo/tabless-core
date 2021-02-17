//Define columns of table
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
  },
  {
    columnName: 'Age:',
    columnIndex: 'age',
  }
];

//Data of table
const data = [
  {
    name: 'Hubert', 
    lastname: 'Dziuda', 
    age: 20,
  },
  {
    name: 'John',
    lastname: 'Snow',
    age: 29,
  },
  {
    //Empty object will be skipped
  },
  'Not an object :<' //Non-objects also :) 
  ,
  {
    name: 'Tom', 
    lastname: 'Williams', 
    age: 19,
  },
  {
    name: 'Mark',
    lastname: 'Brown', 
    age: 24,
  }
];

// config object used to create Tabless instance
const config = {
  addOrdinalNumber: true,
  ordinalHeader: 'Index:',
}
// create instance of Tabless
const tabless = new Tabless(columns, data, config);

//Configuration of already created Tabless instance
tabless.setConfig({
  orderBy: 'age',
  descending: true,
});

// row to the table
tabless.addRow({
  name: 'Ron',
  lastname: 'Jenkins',
  age: 22,
});

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

document.getElementById('tableRoot').append(tabless.render());