import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core/";
import Situation from "./Situation/Situation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCovidCase } from "../../store/slices/covidCaseSlice";

const SituationsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCovidCase());
  }, []);
  const listCases =
    useSelector((state) => state.covidCaseStore.covidCaseList.current) || [];
  return (
    <Box>
      {listCases?.map((index) => {
        return <Situation patientData={index} key={index.id} />;
      })}
    </Box>
  );
};

export default SituationsList;
