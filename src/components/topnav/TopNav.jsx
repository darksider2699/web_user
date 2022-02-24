import React, { useState, useEffect } from "react";
import "./topnav.css";
import Dropdown from "../dropdown/Dropdown";
import notifications from "../../assets/JsonData/notification.json";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core/";
import { logout } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserMedicalInformation } from "../../store/slices/userSlice";
const renderNotificationItem = (item, index) => {
  return (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );
};
const TopNav = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserMedicalInformation());
  }, []);
  const covidStatus =
    useSelector((state) => state.userStore.medicalUserInformation.current) ||
    [];
  const handleLogout = async () => {
    await dispatch(logout());
    history.push("/login");
  };
  console.log("status", covidStatus);
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div
          className="topnav__right-item-warning"
          style={{ display: `${covidStatus.status < 2 ? "flex" : "none"}` }}
        >
          <i class="bx bxs-alarm-exclamation bx-flashing" style = {{margin:"2px 10px 0 0 "}}></i>
          <Typography>{`You are currently F${covidStatus.status}. Please self quarantine and keep tracking your health`}</Typography>
        </div>
        <div className="topnav__right-item">
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px 0 20px 0px " }}
            name="add"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
