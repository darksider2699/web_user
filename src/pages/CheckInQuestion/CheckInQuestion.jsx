import React, { useState } from "react";
import { Box, Typography, TextField } from "@material-ui/core/";
import data from "../../assets/JsonData/question.json";
import QuestionTab from "./QuestionTab/QuestionTab";

const CheckInQuestion = () => {
  return (
    <Box borderRadius={10} marginBottom={5}>
      {data.map((index) => {
        return <QuestionTab question={index} key={index.id} />;
      })}
    </Box>
  );
};

export default CheckInQuestion;
