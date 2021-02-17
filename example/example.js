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


// config object used to create Tabless instance
const config = {
  addOrdinalNumber: true,
  ordinalHeader: 'Index:',
}

const tabless = new Tabless(columns, data, config);

//Configuration of already created Tabless instance
tabless.setConfig({
  orderBy: 'age',
  descending: true,
})

tabless.renderWay = (data) => {
  const tableElement = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  const headersRow = document.createElement('tr');

  data[0].forEach((v, i)=>{
    const headerElement = document.createElement('th');
    headerElement.innerText = v.value;
    if(v.className){
      headerElement.classList.add(v.className)
    }
    headersRow.append(headerElement)
  });

  data.forEach((v, i)=>{
    if(i === 0) return;

    const dataRow = document.createElement('tr');
    
    for (const property in v) {
      const field = document.createElement('td');
      field.innerHTML = v[property].value;
      if(v[property].className){
        field.classList.add(v[property].className);
      }
      dataRow.append(field);
    }
    tableBody.append(dataRow);
  })


  tableHead.append(headersRow);
  tableElement.append(tableHead);
  tableElement.append(tableBody);
  return tableElement;
}

document.getElementById('tableRoot').append(tabless.render());