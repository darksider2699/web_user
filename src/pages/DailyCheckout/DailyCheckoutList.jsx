import React from "react";
import { Box } from "@material-ui/core/";
import DailyCheckout from "./DailyCheckout/Situation";
import "react-toastify/dist/ReactToastify.css";

const DailyCheckoutList = ({list}) => {
  return (
      <Box>
      {list.map((index) => {
        return <DailyCheckout data={index} key={index.id} />;
      })}
    </Box>
  );
};

export default DailyCheckoutList;
