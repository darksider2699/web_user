import { Box, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserMedicalInformation } from "../../store/slices/userSlice";
import moment from "moment";
const AccountInformation = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserMedicalInformation());
  }, []);
  const userInformation =
    useSelector((state) => state.userStore.medicalUserInformation.current) ||
    [];
  console.log("User information", userInformation);
  return (
    <Box>
      <Box border={"1px solid" } borderRadius={8} style={{background:"#FFF"}}>
        <Typography
          style={{
            padding: "10px 0 10px 10px ",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          General Data
        </Typography>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Firstname:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user?.firstName}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Lastname:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user?.lastName}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Contact Address:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user?.contactAddress}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Peronal Email:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user?.personalEmail}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Date Of Birth:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {moment(new Date(userInformation.user?.dateOfBirth)).format(
              "YYYY-MM-DD"
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AccountInformation;
