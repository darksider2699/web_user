import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core/";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  editQuestion,
} from "../../../store/slices/questionSlice"
import YesNoModal from "../../../components/YesNoModal";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionTab = ({ question }) => {
  const dispatch = useDispatch();
  console.log("Question tab", question);
  const [listAnswer, setListAnswer] = useState([...question.answerList]);
  const [correctAnswer, setCorrectAnswer] = useState(question.rightAnswer.id);
  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);
  const [labelQuestion, setLabelQuestion] = useState(question.label);
  const handleAnswerChange = (event) => {
    console.log(event.currentTarget.id);
    let type = event.currentTarget.getAttribute("name");
    switch (type) {
      case "add":
        let temp = [...listAnswer];
        temp.push({ id: listAnswer.length + 1, label: "" });
        setListAnswer([...temp]);
        break;
      case "delete":
        console.log("event.currentTarget.id", event.currentTarget.id);
        let delArr = [...listAnswer];
        let indexDelete = delArr.findIndex(
          (e) => e.id == event.currentTarget.id
        );
        delArr.splice(indexDelete, 1);
        console.log({ indexDelete, delArr });
        setListAnswer([...delArr]);
        break;
      case "save":
        setIsYesNoModalVisible(true);
        console.log({correctAnswer})
        break;
      default:
        break;
    }
  };
  const handleChange = (event) => {
    setCorrectAnswer({id: event.target.id});
  };
  const handleEditTextfield = (event) => {
    console.log("Event", event.target?.value);
    if (event.target.name == "answer") {
      let tempAnswerList = listAnswer;
      console.log("tempAnswerList", tempAnswerList);
      let indexObj = tempAnswerList.findIndex(
        (index) => index.id == event.target?.id
      );
      console.log("event.target?.id", event.target);
      console.log("index obj", indexObj);
      console.log("tempAnswerList[indexObj]", tempAnswerList[indexObj].label);
      tempAnswerList[indexObj] = {
        id: tempAnswerList[indexObj].id,
        label: event.target.value,
      };
      setListAnswer([...tempAnswerList]);
    } else {
      setLabelQuestion(event.target.value);
    }
  };
  const handleConfirmChangeQuestion = async () => {
    await dispatch(
      editQuestion({
        id: question.id,
        label: labelQuestion,
        answerRequest: listAnswer,
        rightAnswerPosition: listAnswer.findIndex(
          (index) => index.id == correctAnswer
        ),
        cb: () => {
          setTimeout(toast("Add list test result successfully!"), 3000);
        },
      })
    );
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
        value={labelQuestion}
        fullWidth
        name="question"
        onChange={handleEditTextfield}
        multiline
        style={{ padding: "10px 10px 10px 10px" }}
        variant="outlined"
      />
      {listAnswer.map((answer) => {
        return (
          <Box key={answer.id + "answer"}>
            <Typography
              style={{ padding: "10px 10px 10px 10px" }}
            >{`Answer ${answer.id}`}</Typography>
            <Box display={"flex"}>
              <TextField
                value={answer.label || "Add Answer Here..."}
                fullWidth
                name="answer"
                id={answer.id + ""}
                onChange={handleEditTextfield}
                style={{ padding: "10px 10px 10px 10px" }}
                variant="outlined"
              />
              <Box
                name="delete"
                id={answer.id}
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
        <FormControl
          style={{ marginLeft: "12px", width: "200px", marginRight: "10px" }}
        >
          <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={correctAnswer}
            label="CorrectAnswer"
            onChange={handleChange}
          >
            {listAnswer.map((index) => {
              return (
                <MenuItem key={index.id} value={index.id}>
                  {index.label}
                </MenuItem>
              );
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
          name="save"
          onClick={handleAnswerChange}
        >
          save
        </Button>
        <ToastContainer />
      </Box>
      <YesNoModal
        isModalVisible={isYesNoModalVisible}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to change this answer?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsYesNoModalVisible(false);
        }}
        onOk={handleConfirmChangeQuestion}
      />
    </Box>
  );
};

export default QuestionTab;
