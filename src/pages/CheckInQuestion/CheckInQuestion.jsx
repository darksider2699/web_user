import React, { useState } from "react";
import { Box, Typography, TextField } from "@material-ui/core/";
import data from "../../assets/JsonData/question.json";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import QuestionTab from "./QuestionTab/QuestionTab";

const CheckInQuestion = () => {
  const [answerOfQuestions, setAnswerOfQuestions] = useState([]);
  const [question, setQuestion] = useState([]);

  return (
    <Box borderRadius={10} marginBottom={5}>
      {data.map((index) => {
        return <QuestionTab question={index} key={index.id} />;
      })}
    </Box>
  );
};

export default CheckInQuestion;
