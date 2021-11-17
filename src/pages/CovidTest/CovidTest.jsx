import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core/";
import TestResult from "./TestResult/TestResult";
import Button from "@mui/material/Button";
import moment from "moment";
import data from "../../assets/JsonData/covidTest.json";
import "./styles.css";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import user_testing_data from "../../assets/JsonData/covid_test_result.json";

const CovidTest = () => {
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
      name: "isNegative",
      label: "Negative?",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? (
                <i className="bx bx-check-circle"></i>
              ) : (
                <i className="bx bx-x-circle"></i>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button variant="outlined" color="error">
              Warn
            </Button>
          );
        },
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
  return (
    <Box display={"block"}>
      <Box style={{ height: "18vw", overflowY: "scroll" }}>
        {data.map((index) => (
          <TestResult
            key={index.id}
            onClickRow={onClickRow}
            numberOfNegative={index.numberOfNegative}
            date={moment(new Date(index.date)).format("DD-MM-YYYY")}
          ></TestResult>
        ))}
      </Box>

      <Box
        position={"relative"}
        marginTop={4}
        display={isShowTable ? "block" : "none"}
      >
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={`Test Result on ${dateSelected}`}
            data={user_testing_data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default CovidTest;
