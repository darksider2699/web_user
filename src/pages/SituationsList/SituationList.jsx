import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core/";
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
