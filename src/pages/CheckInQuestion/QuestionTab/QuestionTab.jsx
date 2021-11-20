import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core/";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const QuestionTab = ({ question }) => {
  const [listAnswer, setListAnswer] = useState([...question.answers]);

  const handleAnswerChange = (event) => {
    console.log("original", listAnswer);
    console.log(event.currentTarget);
    let type = event.currentTarget.getAttribute("name");
    switch (type) {
      case "add":
        let temp = [...listAnswer];
        temp.push({ value: listAnswer.length + 1 });
        setListAnswer([...temp]);
        break;
      case "delete":
        let delArr = [...listAnswer];
        let indexDelete = delArr.findIndex(
          (e) => e.value === event.currentTarget.id
        );
        delArr.splice(indexDelete, 1);
        delArr.map((index) => {
          index.value = delArr.findIndex((e) => e.value === index.value) + 1;
        });
        setListAnswer([...delArr]);
        break;

      default:
        break;
    }
  };
  return (
    <Box
      key={question.id + "box"}
      bgcolor={"white"}
      borderRadius={10}
      marginBottom={5}
      marginLeft={5}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      justifyContent={"space-between"}
      display={"block"}
      width={"50%"}
    >
      <TextField
        defaultValue={question.question}
        fullWidth
        multiline
        style={{ padding: "10px 10px 10px 10px" }}
        variant="outlined"
      />
      {listAnswer.map((answer) => {
        return (
          <Box key={answer.value + "answer"}>
            <Typography
              style={{ padding: "10px 10px 10px 10px" }}
            >{`Answer ${answer.value}`}</Typography>
            <Box display={"flex"}>
              <TextField
                defaultValue={answer.label || "Add Answer Here..."}
                fullWidth
                style={{ padding: "10px 10px 10px 10px" }}
                variant="outlined"
              />
              <Box
                name="delete"
                id={answer.value}
                style={{
                  paddingTop: "20px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={handleAnswerChange}
              >
                <i className="bx bxs-x-circle"></i>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "10px 0 10px 10px " }}
        name="add"
        onClick={handleAnswerChange}
      >
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionTab;
