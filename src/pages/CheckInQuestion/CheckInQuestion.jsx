import React, { useState } from "react";
import { Box, Typography, TextField } from "@material-ui/core/";
import data from "../../assets/JsonData/question.json";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const CheckInQuestion = ({ date, numberOfNegative, onClickRow }) => {
  const [answerOfQuestions, setAnswerOfQuestions] = useState([]);
  const [question,setQuestion] = useState([]);
  function handleChange(event) {
    const questionId = event.target.name;
    const answer = event.target.value;
    let tempData = [...answerOfQuestions];
    let indexOfAnswer = answerOfQuestions?.findIndex(
      (element) => element.questionId === questionId + ""
    );

    indexOfAnswer > -1
      ? (tempData[indexOfAnswer] = { questionId: questionId, answer: answer })
      : tempData.push({ questionId: questionId, answer: answer });
    setAnswerOfQuestions(tempData);
    console.log(tempData);
  }
  return (
    <Box borderRadius={10} marginBottom={5} style={{ cursor: "pointer" }}>
      {data.map((index) => {
        return (
          <Box
            key={index.id + "box"}
            bgcolor={"white"}
            borderRadius={10}
            marginBottom={5}
            marginLeft={5}
            boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
            justifyContent={"space-between"}
            display={"block"}
            width={"50%"}
            style={{ cursor: "pointer" }}
          >
            <TextField
              defaultValue={index.question}
              fullWidth
              multiline
              style={{padding:'10px 10px 10px 10px'}}
              variant="outlined"

            />

            <RadioGroup
              key={index.id}
              aria-label="answer"
              style={{paddingLeft:'20px'}}
              name={index.id + ""}
              value={
                parseInt(
                  answerOfQuestions?.find(
                    (element) => element.questionId === index.id + ""
                  )?.answer
                ) || 2
              }
              onChange={handleChange}
            >
              {index.answers.map((answer) => {
                return (
                  <FormControlLabel
                    key={index.id + "" + answer.answerId}
                    value={answer.value}
                    label={answer.label}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </Box>
        );
      })}
    </Box>
  );
};

export default CheckInQuestion;
