import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core/";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const QuestionTab = ({ question }) => {
  const [listAnswer, setListAnswer] = useState([...question.answers]);
  const [correctAnswer, setCorrectAnswer] = useState(1);
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
  const handleChange =(event) =>{
    setCorrectAnswer(event.target.value);
  }
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
      <Box>
        <FormControl  style={{marginLeft:'12px', width:"200px", marginRight:"10px"}}>
          <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={correctAnswer}
            label="CorrectAnswer"
            onChange={handleChange}
            
          >
           {listAnswer.map(index=>{
             return <MenuItem value={index.value}>{index.label}</MenuItem>
           })}
          </Select>
        </FormControl>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 0 10px 10px " }}
          name="add"
          onClick={handleAnswerChange}
        >
          Add Answer
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ margin: "10px 25px 10px 10px " }}
          name="add"
          onClick={handleAnswerChange}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionTab;
