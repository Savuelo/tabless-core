//Define columns of table
const columns = [ 
  {
    columnName: 'Name:', // Display name of column
    columnIndex: 'name', // index/property of object with data
    columnId: 'nameColumn', //Optional columnId, used to edit or delete specific column
  },
  {
    columnName: 'Lastname:',
    columnIndex: 'lastname',
    columnId: 'lastnameColumn',

    /*
      Format function what will be used to format data in column
      In this case all of the data in this column will be uppercased
    */
    columnFormat: (value) => {
      return value.toUpperCase();
    }
  },
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

tabless.addColumns({
  columnName: 'Age:',
  columnIndex: 'age',
  columnId: 'ageColumn',
});

//Configuration of already created Tabless instance
tabless.setConfig({
  orderBy: 'age',
  descending: true,
});


// add new rows to the table
tabless.addRows([{
  name: 'Ron',
  lastname: 'Jenkins',
  age: 22,
},{
  name: 'Lucas',
  lastname: 'Murphy',
  age: 33,
}]);

tabless.renderWay = (data) => {
  const consoleStyles = 'font-size: 13px; color: #bada55; background-color: black; padding: 3px';
  console.log('%c renderWay `data` param:', consoleStyles);
  console.log(data);

  const tableElement = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  console.log('%c Rows data (absoluteId and cells array):', consoleStyles);
  data.forEach(({absoluteId, cells}, i)=>{
    console.log(`%c Row ${i}:`, consoleStyles);
    console.log(`absoluteId: ${absoluteId}`);
    console.log(cells);

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