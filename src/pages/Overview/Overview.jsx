import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserMedicalInformation,
  addNewDailyCheckin,
} from "../../store/slices/userSlice";
import { getAllQuestion } from "../../store/slices/questionSlice";
import { Box, Button, Typography } from "@material-ui/core/";
import { useForm, Controller } from "react-hook-form";
import YesNoModal from "../../components/YesNoModal";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
const Overview = () => {
  const dispatch = useDispatch();
  const [isConfirmAnswer, setIsConfirmAnswer] = useState(false);
  const [answer, setAnswer] = useState();
  useEffect(() => {
    dispatch(getUserMedicalInformation());
    dispatch(getAllQuestion());
  }, []);
  const dailyCheckinInformationList =
    useSelector(
      (state) =>
        state.userStore.medicalUserInformation.current
          .dailyCheckinInformationList
    ) || [];
  const allQuestion =
    useSelector((state) => state.questionStore.questionList.current) || [];
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});
  let sortedDailyCheckinInformationList = [...dailyCheckinInformationList];
  sortedDailyCheckinInformationList.sort(function compare(a, b) {
    var dateA = new Date(a.dateRecord);
    var dateB = new Date(b.dateRecord);
    return dateB - dateA;
  });
  const onSubmit = (data) => {
    console.log("data", Object.values(data));
    setAnswer(Object.values(data));
    setIsConfirmAnswer(true);
  };
  const handleAddNewDailyCheckin = async () => {
    console.log("Check", checkAnswer());
    await dispatch(
      addNewDailyCheckin({
        isComing: true,
        isAllowToCome: checkAnswer(),
        dateRecord: moment(new Date()).format("YYYY-MM-DD"),
        cb: () => {
          toast("Add new daily checkin success!");
          setIsConfirmAnswer(false);
          dispatch(getUserMedicalInformation());
        },
      })
    );
  };
  const checkAnswer = () => {
    return (
      JSON.stringify(answer) ==
      JSON.stringify(allQuestion.map((index) => index.rightAnswer.id + ""))
    );
  };
  const lastRecord = sortedDailyCheckinInformationList[0];
  console.log("aa", lastRecord);
  const isCheckedin = () => {
    let lastCheckin = moment(new Date(lastRecord?.dateRecord)).format(
      "YYYY-MM-DD"
    );
    let today = moment(new Date()).format("YYYY-MM-DD");
    console.log("inside function", lastCheckin,today);
    return lastCheckin === today;
  };
  console.log("isCheckedin?", isCheckedin());
  if (!isCheckedin()) {
    return (
      <div>
        <Typography align="center" variant="h4">
          Please Answer These Questions:
        </Typography>
        <Typography align="center" style={{ color: "red" }} gutterBottom>
          Warning: Declaring false information is a violation of Vietnamese law
          and may result in criminal prosecution!
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {allQuestion.map((index) => {
            return (
              <Box
                key={index.id}
                sx={{ p: 2, border: "1px dashed grey" }}
                marginBottom={5}
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend">{index.label}</FormLabel>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name={index.id + ""}
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          {index.answerList.map((answer) => {
                            return (
                              <FormControlLabel
                                value={answer.id || ""}
                                key={answer.id + ""}
                                control={<Radio />}
                                label={answer.label}
                              />
                            );
                          })}
                        </RadioGroup>
                      );
                    }}
                  />
                </FormControl>
              </Box>
            );
          })}
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px 0 20px 0px " }}
            type="submit"
          >
            {" "}
            Submit
          </Button>
        </form>
        <YesNoModal
          isModalVisible={isConfirmAnswer}
          hideModal={() => {}}
          title={"Confirm"}
          message={"Are you sure you want to submit your daily checkin?"}
          okText={"OK"}
          cancelText={"Cancel"}
          onCancel={() => {
            setIsConfirmAnswer(false);
          }}
          onOk={handleAddNewDailyCheckin}
        />
        <ToastContainer />
      </div>
    );
  } else if (lastRecord.allowToCome) {
    return (
      <Box textAlign={"center"}>
        <i
          class="bx bx-check-circle bx-flashing"
          style={{ fontSize: "200px", textAlign: "center", color: "green", marginBottom:'20px' }}
        ></i>
        <Typography align="center" variant="h3">You are good to go. See you at the office</Typography>
      </Box>
    );
  }
  else {
    return (
      <Box textAlign={"center"}>
        <i
          class="bx bxs-x-circle bx-flashing"
          style={{ fontSize: "200px", textAlign: "center", color: "red", marginBottom:'20px' }}
        ></i>
        <Typography align="center" variant="h3">Sorry, you can't come to the office to day. Keep tracking your health!</Typography>
      </Box>
    );
  }
};

export default Overview;
