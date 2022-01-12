import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@material-ui/core/";
import QuestionTab from "./QuestionTab/QuestionTab";

const CheckInQuestion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllQuestion((output) => {
      if (output) {
        setData(output);
        console.log(output);
      }
    }); 
  }, []);

  async function getAllQuestion(resolve = () => {}) {
    try {
      const response = await fetch(`http://localhost:8080/api/question/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLYXRyaW5hV2FnbmVyOCIsImlhdCI6MTY0MTYzMzUyMiwiZXhwIjoxNjQxNzE5OTIyfQ.YgGuGTOwPSBYIzZ3PCCH3YJ88tCvnL18sTVtf3_b2rcdCI2_o73qMS_k2yi79H05tOAezx1Ne_B0Bny4GAD_3g`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data_1 = await response.json();
      resolve(data_1);
    } catch (error) {}
  }

  return (
    <Box borderRadius={10} marginBottom={5}>
      {data?.map((index) => {
        return <QuestionTab question={index} key={index.id} />;
      })}
    </Box>
  );
};

export default CheckInQuestion;
