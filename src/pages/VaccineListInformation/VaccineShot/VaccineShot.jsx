import { Box, Button, Typography } from "@material-ui/core/";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { deleteVaccineShot } from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import YesNoModal from "../../../components/YesNoModal";

const VaccineShot = ({ vaccineInformation, onUpdateData }) => {
  const dispatch = useDispatch();
  console.log("vaccine", vaccineInformation);
  const [isConfirmDeleteVaccineShot, setIsConfirmDeleteVaccineShot] =
    useState(false);
  const handleDeleteVaccine = () => {
    setIsConfirmDeleteVaccineShot(true);
  };
  const handleConfirmDeleteVaccineShot = async () => {
    await dispatch(
      deleteVaccineShot({
        id: vaccineInformation.id,
        cb: () => {
          toast("Delete success!");
          onUpdateData();
        },
      })
    );
    setIsConfirmDeleteVaccineShot(false)
  };
  return (
    <Box
      display={"block"}
      bgcolor={"white"}
      borderRadius={10}
      marginBottom={5}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      justifyContent={"space-between"}
      width={"50%"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        style={{ cursor: "pointer" }}
      >
        <Typography
          style={{ fontWeight: "700", padding: "10px 10px 10px 10px" }}
        >{`Date: ${moment(vaccineInformation.date).format(
          "DD-MM-YYYY"
        )}`}</Typography>
        <Box
          name="delete_vaccine"
          type="delete_vaccine"
          style={{
            paddingTop: "10px",
            paddingRight: "10px",
            color: "red",
            cursor: "pointer",
            float: "right",
          }}
          onClick={handleDeleteVaccine}
        >
          <i className="bx bxs-x-circle"></i>
        </Box>
      </Box>
      <Box display="flex">
        <Typography
          style={{
            padding: "10px 0 10px 10px ",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Vaccine Type:
        </Typography>
        <Typography
          style={{
            padding: "10px 0 10px 10px ",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          {vaccineInformation.type.name}
        </Typography>
      </Box>
      <YesNoModal
        isModalVisible={isConfirmDeleteVaccineShot}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to delete this Vaccine shot?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsConfirmDeleteVaccineShot(false);
        }}
        onOk={handleConfirmDeleteVaccineShot}
      />
      <ToastContainer />
    </Box>
  );
};
export default VaccineShot;
