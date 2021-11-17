import React from "react";
import { Box, Typography } from "@material-ui/core/";
import data from "../../assets/JsonData/question.json";
const CheckInQuestion = ({ date, numberOfNegative, onClickRow }) => {
  const employeeNumber = 100;
  const handleOnClick = () => {
    onClickRow(date);
  };
  return (
    <Box
      onClick={handleOnClick}
      borderRadius={10}
      marginBottom={5}
      style={{ cursor: "pointer" }}
    >
      {data.map((index) => {
        return (
          <Box
            onClick={handleOnClick}
            bgcolor={"white"}
            borderRadius={10}
            marginBottom={5}
            boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
            justifyContent={"space-between"}
            display={"block"}
            width={"50%"}
            style={{ cursor: "pointer" }}
          >
            <Typography style={{padding:'10px 10px 10px 10px'}}>{`${index.question}`}</Typography>
            <Typography>{`${index.answer1}`}</Typography>
            <Typography>{`${index.answer2}`}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default CheckInQuestion;
