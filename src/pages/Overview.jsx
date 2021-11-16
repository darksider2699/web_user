import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core/";
import LinearProgress, {
  linearProgressClasses,
} from "@material-ui/core/LinearProgress";
import { Bar } from "react-chartjs-2";
import checkinData from "../assets/JsonData/check-inData.json";
import MUIDataTable from "mui-datatables";
import Grow from "@mui/material/Grow";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "./Overview.css";

const Customer = () => {
  const state = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Checkin Progress This Week (%)",
        backgroundColor: "#62b4ff",
        borderColor: "#62b4ff",
        borderWidth: 2,
        data: [65, 59, 80, 81, 30],
      },
    ],
  };
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [isShowTable, setIsShowTable] = useState(false);
  const onClickProgressBar = () => {
    setIsShowTable(!isShowTable);
  };
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 40,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);
  const columns = [
    {
      name: "name",
      label: "Tên",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Chức vụ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "department",
      label: "Chỗ ngồi",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: "ĐT liên lạc",
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
      name: "isCheckin",
      label: "Trạng thái",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? "Mở" : "Khoá"}
            </div>
          );
        },
      },
    },
  ];
  const options = {
    filter: false,
    selectableRows: "none",
    onRowClick: null,
    serverSide: true,
    jumpToPage: true,
    searchPlaceholder: "Tìm kiếm theo tên hoặc tài khoản",
    //count, // Use total number of items
    onTableChange: (action, tableState) => {},
  };
  return (
    <div>
      <Box>
        <Box style={{ position: "relative" }}>
          <Box onClick={(e) => onClickProgressBar()}>
            <BorderLinearProgress variant="determinate" value={50} />
          </Box>
          <Typography
            style={{
              position: "absolute",
              color: "black",
              top: 6,
              left: "50%",
              fontSize: "16px",
              fontWeight: "700",
              transform: "translateX(-50%)",
            }}
          >
            50%
          </Typography>
        </Box>
        <Typography
          style={{
            textAlign: "center",
            color: "black",
            top: 6,
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Checkin Progress today (%)
        </Typography>
      </Box>
      <Box marginTop={3} marginBottom={3} >
        <Box width={'90%'} paddingLeft={'10%'}>
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Checkin Progress Status Recently",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              maintainAspectRatio: true,
            }}
          />
        </Box>
      </Box>
      <Box marginLeft={0} display={isShowTable ? "block" : "none"}>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"Danh sách tài khoản trong hệ thống"}
            data={checkinData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default Customer;
