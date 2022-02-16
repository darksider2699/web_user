import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@material-ui/core/";
import QuestionTab from "./QuestionTab/QuestionTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../store/slices/questionSlice";
const CheckInQuestion = () => {
  const dispatch = useDispatch();
  const allQuestion =
    useSelector((state) => state.questionStore.questionList.current) || [];
  useEffect(() => {
    dispatch(getAllQuestion());
  }, []);
  console.log("Question", allQuestion);
  return (
    <Box borderRadius={10} marginBottom={5}>
      {allQuestion?.map((index) => {
        return <QuestionTab question={index} key={index.id} />;
      })}
    </Box>
  );
};

export default CheckInQuestion;
