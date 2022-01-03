import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core/";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const Situation = ({ patientData }) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [dateSelected, setDateSelected] = useState();

  const [isShowTable, setIsShowTable] = useState(false);
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date Contact",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: "none",
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    //count, // Use total number of items
  };

  const onClickRow = (value) => {
    if (isShowTable) {
      if (dateSelected === value) {
        setIsShowTable(false);
      } else {
        setDateSelected(value);
      }
    } else {
      setIsShowTable(true);
      setDateSelected(value);
    }
  };
  const [isOpenList, setIsOpenList] = useState(false);
  const handleClickBox = () => {
    setIsOpenList(!isOpenList);
  };
  return (
    <Box>
      <Box
        display={"flex"}
        bgcolor={"white"}
        borderRadius={10}
        marginBottom={5}
        boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
        justifyContent={"space-between"}
        width={"50%"}
        onClick={handleClickBox}
      >
        <Box display={"block"} style={{ cursor: "pointer" }}>
          <Typography
            style={{ padding: "10px 0 10px 10px ", fontWeight: "700" }}
          >{`Date: ${moment(patientData.date).format("DD-MM-YYYY")}`}</Typography>
          <Box display="flex">
            <Typography
              style={{
                padding: "10px 0 10px 10px ",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Patient's name
            </Typography>
            <Typography
              style={{
                padding: "10px 0 10px 10px ",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Nguyen Van A
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              style={{
                padding: "10px 0 10px 10px ",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Patient's Status
            </Typography>
            <Typography
              style={{
                padding: "10px 0 10px 10px ",
                fontWeight: "700",
                fontSize: 20,
                color: `${
                  patientData.status.value === 0
                    ? "red"
                    : patientData.status.value === 1
                    ? "orange"
                    : "green"
                }`,
              }}
            >
              {patientData.status.label}
            </Typography>
          </Box>
        </Box>
        <i
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight:'20px'
          }}
          className={`bx bxs-${isOpenList ? "up" : "down"}-arrow`}
        ></i>
      </Box>
      <Box marginLeft={0} marginBottom={3} display={isOpenList ? "block" : "none"}>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"Contact list recently"}
            data={patientData.contact}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default Situation;
