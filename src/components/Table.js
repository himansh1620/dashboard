import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'

function App() {
  const [data, setData] = useState([])
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Product Name", field: "productName" },
    { title: "Category", field: "category" },
    { title: "Quantity", field: 'quantity' },
    { title: "Price (INR)", field: "price", }
  ]

  useEffect(() => {
    const rows = localStorage.getItem('table')
    if(rows) {
      setData(JSON.parse(rows));
    }
  },[])
  useEffect(() => {
    localStorage.setItem('table', JSON.stringify(data))
  })

  return (
    <div>
      <MaterialTable
        title="Products Table"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 1000000), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
            localStorage.setItem('table', JSON.stringify(updatedRows))
           
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
            localStorage.setItem('table', JSON.stringify(updatedRows))
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
            localStorage.setItem('table', JSON.stringify(updatedRows))
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

export default App;