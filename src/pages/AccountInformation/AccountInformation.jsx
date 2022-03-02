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
    const convertJobTitle = (input) => {
      let result = input?.map((value, index) => {
        return value.name + " - level: " + value.level;
      });
      return result.map((item, index) => (index ? ", " : "") + item).join("");
    };
  console.log("User information", userInformation);
  return (
    <Box>
      <Box border={"1px solid"} borderRadius={8} style={{ background: "#FFF" }}>
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
            First name:
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
            Last name:
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
            Personal Email:
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
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Gender:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user?.gender === false ? "Male" : "Female"}
          </Typography>
        </Box>
      </Box>
      <Box border={"1px solid"} borderRadius={8} style={{ background: "#FFF" }} marginTop = {5}>
        <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Company Email:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user.companyUserInformation.companyEmail}
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
            Department:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {userInformation.user.companyUserInformation.department.name}
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
            Job Title:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {convertJobTitle(userInformation.user.companyUserInformation.jobTitles)}
          </Typography>
        </Box>
      </Box>
      <Box border={"1px solid"} borderRadius={8} style={{ background: "#FFF" }} marginTop = {5}>
      <Box display="flex">
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Covid Status:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
              color: `${userInformation.status === 0 ? "red" : userInformation.status ? "orange" : "green"}`
            }}
          >
            {userInformation.status === 0 ? "F0" : userInformation.status ? "F1" : "Safe"}
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
            Vaccine Status:
          </Typography>
          <Typography
            style={{
              padding: "10px 0 10px 10px ",
              fontWeight: "700",
              fontSize: 20,
              color: `${userInformation.vaccineInformations.length === 0 ? "red" : userInformation.status ? "orange" : "green"}`
            }}
          >
            {userInformation.vaccineInformations.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AccountInformation;
