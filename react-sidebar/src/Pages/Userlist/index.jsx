import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import EditIcon from "@material-ui/icons/EditLocation";
import DeleteIcon from "@material-ui/icons/Delete";

const UserList = () =>  {
    
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const token = localStorage.getItem("token");
    const fetchData = async() => {
        const response = await fetch('http://localhost:5000/api/', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        setData(data);
    };

    const columns = [
      { title: "ID", field: "id", editable: false },
      { title: "Full Name", field: "fullName" },
      { title: "User Name", field: "username" },
      { title: "ROLE", field: "role" }
    ];
   
    // const handleBulkDelete = (selectedRows.id) => {
    //   await fetch(`http://localhost:5000/api/${id}`,{
    //       method: "DELETE",
    //       headers:{
    //           'Content-Type': 'application/json'
    //       }
    //     });
    //   const updatedData = tableData.filter(row => !selectedRows.includes(row))
    //   setTableData(updatedData)
    // }
  //   const deleteUser = async(id) => {
  //     await fetch(`http://localhost:5000/api/${id}`,{
  //         method: "DELETE",
  //         headers:{
  //             'Content-Type': 'application/json'
  //         }
  //     });
  //     fetchData();
  // }

    return (
      <div className="App">
        <h1 align="center">Employee Data</h1>
        
        <MaterialTable
          title="Employee Data"
          data={data}
          columns={columns}
          onSelectionChange={(rows) => setSelectedRows(rows)}
          icons={{
            // Add: () => <EditIcon style={{ color: "blue" }} />,
            Edit: () => <EditIcon style={{ color: "orange" }} />,
            Delete: () => <DeleteIcon style={{ color: "red" }} />
            
          }}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...data,
                  { id: Math.floor(Math.random() * 100), ...newRow }
                ];
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...data];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                const updatedRows = [...data];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              })
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first"
          }}
        />
      </div>
    );
  }
  
export default UserList;