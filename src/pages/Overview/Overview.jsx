import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core/";
import LinearProgress, {
  linearProgressClasses,
} from "@material-ui/core/LinearProgress";
import { Bar } from "react-chartjs-2";
import checkinData from "../../assets/JsonData/check-inData.json";
import MUIDataTable from "mui-datatables";
import Grow from "@mui/material/Grow";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "./styles.css";

const Overview = () => {
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
      label: "Name",
      options: {
        filter: false,
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
        filter: true,
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
      name: "isCheckin",
      label: "Checkin Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? (
                <i class="bx bx-check-circle"></i>
              ) : (
                <i class="bx bxs-hourglass-top"></i>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "result",
      label: "Result",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === 1 ? "green" : "red"}`}>
              {value === 1 ? "Come" : value === 2 ? "Not Come" : "-"}
            </div>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: "none",
    print:false,
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    //count, // Use total number of items
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
      <Box marginTop={3} marginBottom={3}>
        <Box width={"90%"} paddingLeft={"10%"}>
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
            title={"Checkin List"}
            data={checkinData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default Overview;
