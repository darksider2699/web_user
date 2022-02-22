import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyUserInformation } from "../../store/slices/userSlice";
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function Login() {
  const dispatch = useDispatch();
  const tempArr = ["1"];
  const [selectedRows, setSelectedRows] = useState(["1"]);
  const listUser = useSelector(
    (state) => state.userStore.listCompanyUserInformation.current
  );
  useEffect(() => {
    dispatch(getAllCompanyUserInformation());
  }, []);
  const convertJobTitle = (input) => {
    let result = input?.map((value, index) => {
      return value.name + " - level: " + value.level;
    });
    return result.map((item, index) => (index ? ", " : "") + item).join("");
  };
  const convertDataForTableUser = (input) => {
    let result = input?.map((value, index) => {
      return {
        id: value.id + "",
        username: value.user.account.username,
        name: value.user.firstName + " " + value.user.lastName,
        companyEmail: value.companyEmail,
        jobTitle: value.jobTitles[0]?.name
          ? convertJobTitle(value.jobTitles)
          : "--",
        department: value.department?.name ? value.department?.name : "--",
      };
    });
    return result;
  };
  const listData = convertDataForTableUser(listUser);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "companyEmail", headerName: "Company Email", width: 130 },
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
  ];
//   const [selectionModel, setSelectionModel] = useState(() =>
//     listData.filter((r) => templateSelected.includes(r.id)).map((r) => r.id)
//   );

  console.log("AAA", selectedRows);
  return (
    <div>
      {" "}
      <DataGrid
        rows={listData}
        columns={columns}
        pageSize={10}
        onSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={selectedRows}
      />
    </div>
  );
}
