import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core/";
import LinearProgress, {
  linearProgressClasses,
} from "@material-ui/core/LinearProgress";
import { Bar } from "react-chartjs-2";

const state = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Checkin Progress This Week",
      backgroundColor: "#62b4ff",
      borderColor: "#62b4ff",
      borderWidth: 2,
      data: [65, 59, 80, 81, 30],
    },
  ],
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 40,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const Customer = () => {
  return (
    <div>
      <Box>
      <Box style={{ position: "relative" }}>
        <BorderLinearProgress variant="determinate" value={50} />
        <Typography
          style={{
            position: "absolute",
            color: "black",
            top: 6,
            left: "50%",
            fontSize: "16px",
            fontWeight: "700",
            transform: "translateX(-50%)",
          }}
        >
          50%
        </Typography>
        </Box> 
        <Typography
          style={{
            textAlign:"center",
            color: "black",
            top: 6,
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Checkin Progress today 
        </Typography>
      </Box>
      <Box marginTop={3}>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Checkin Progress Status Recently",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Customer;
