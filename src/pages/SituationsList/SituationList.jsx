import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core/";
import Button from "@mui/material/Button";
import moment from "moment";
import data from "../../assets/JsonData/covidTest.json";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import covidTracingData from "../../assets/JsonData/covid_tracing.json";
import Situation from "./Situation/Situation";

const SituationsList = () => {
  return (
    <Box>
      {covidTracingData.map(index=>{
        return(<Situation patientData={index}/>);
      })}
    </Box>
  );
};

export default SituationsList;
