import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core/";
import TestResult from "./TestResult/TestResult";
import Button from "@mui/material/Button";
import moment from "moment";
import "./styles.css";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import user_testing_data from "../../assets/JsonData/covid_test_result.json";
const CovidTest = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTestResult((output) => {
      if (output) {
        setData(output);
        console.log(output);
      }
    }); 
  }, []);
  async function getAllTestResult(resolve = () => {}) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/test_result/all_result`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLYXRyaW5hV2FnbmVyOCIsImlhdCI6MTY0MTYzMzUyMiwiZXhwIjoxNjQxNzE5OTIyfQ.YgGuGTOwPSBYIzZ3PCCH3YJ88tCvnL18sTVtf3_b2rcdCI2_o73qMS_k2yi79H05tOAezx1Ne_B0Bny4GAD_3g`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data_1 = await response.json();
      resolve(data_1);
    } catch (error) {
    }
  }

 
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
        {data?.map((index) => (
          <TestResult
            key={index.id}
            onClickRow={onClickRow}
            numberOfNegative={index.negative}
            date={moment(new Date(index.dateRecord)).format("DD-MM-YYYY")}
            total = {index.total}
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
