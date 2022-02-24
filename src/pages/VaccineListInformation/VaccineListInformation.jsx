import {
  getUserMedicalInformation,
  addNewVaccineShot,
} from "../../store/slices/userSlice";
import { getAllVaccineType } from "../../store/slices/vaccineSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@material-ui/core/";
import React, { useState, useEffect } from "react";
import VaccineShot from "./VaccineShot/VaccineShot";
import ReactModal from "react-modal";
import Select from "react-select";
import YesNoModal from "../../components/YesNoModal";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const VaccineListInformation = () => {
  const dispatch = useDispatch();
  const [isAddNewVaccineModal, setIsAddNewVaccineModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [isConfirmCreateNewVaccineShot, setIsConfirmCreateNewVaccineShot] =
    useState(false);
  const [dateRecord, setDateRecord] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const vaccineInformation =
    useSelector(
      (state) =>
        state.userStore.medicalUserInformation.current.vaccineInformations
    ) || [];
  const listVaccineType =
    useSelector((state) => state.vaccineStore.vaccineTypeList.current) || [];
  useEffect(() => {
    dispatch(getUserMedicalInformation());
    dispatch(getAllVaccineType());
  }, []);
  const customStyles = {
    content: {
      top: "40%",
      left: "30%",
      right: "10%",
      bottom: "1%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      marginLeft: "20%",
    },
    overlay: { zIndex: 1000 },
  };
  let sortedVaccineInformation = [...vaccineInformation];
  sortedVaccineInformation.sort(function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  });
  const handleAddNewVaccine = () => {
    setIsAddNewVaccineModal(true);
  };
  const hideModal = () => {
    setIsAddNewVaccineModal(false);
  };
  const handleOnChangeDate = async (event) => {
    await setDateRecord(event.target.value);
  };
  const convertDataForReactSelect = (input) => {
    let result = input?.map((value, index) => {
      return {
        value: value.id,
        label: value.name,
      };
    });
    return result;
  };
  const openConfirmModalAddNewVaccineShot = () => {
    setIsConfirmCreateNewVaccineShot(true);
  };
  const handleConfirmAddNewVaccineShot = async () => {
    await dispatch(
      addNewVaccineShot({
        date: dateRecord,
        type: selectedOption.value,
        cb: () => {
          dispatch(getUserMedicalInformation());
          toast("Add new vaccine shot successfully!");
        },
      })
    );
    setIsAddNewVaccineModal(false);
    setIsConfirmCreateNewVaccineShot(false);
  };
  const onUpdateData = async () => {
    await dispatch(getUserMedicalInformation());
  };
  console.log("Vaccine", listVaccineType);
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        You have taken {vaccineInformation.length} vaccine shot(s)
      </Typography>
      <Box>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px 0 20px 0px " }}
            name="add"
            onClick={handleAddNewVaccine}
          >
            Add New Shot
          </Button>
        </Box>
        {sortedVaccineInformation?.map((index) => {
          return <VaccineShot vaccineInformation={index} key={index.id} onUpdateData = {onUpdateData} />;
        })}
      </Box>
      <ReactModal
        isOpen={isAddNewVaccineModal}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <Box>
          <Box display={"flex"}>
            <Typography
              variant="h4"
              color="primary"
              className="add_question_header"
            >
              Add New Case
            </Typography>

            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "10px 0 20px 50px " }}
              name="add"
              onClick={hideModal}
            >
              Cancel
            </Button>
          </Box>
          <div>
            <label>Date:</label>
            <input
              type="date"
              id="date_select"
              className="date_select"
              name="trip-start"
              value={dateRecord}
              onChange={handleOnChangeDate}
            />
          </div>
          <Box>
            <Select
              options={convertDataForReactSelect(listVaccineType)}
              onChange={setSelectedOption}
              value={selectedOption}
            />
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: "10px 0 20px 0px " }}
            name="add"
            onClick={openConfirmModalAddNewVaccineShot}
          >
            Submit
          </Button>
        </Box>
      </ReactModal>
      <YesNoModal
        isModalVisible={isConfirmCreateNewVaccineShot}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to add new Vaccine shot?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsConfirmCreateNewVaccineShot(false);
        }}
        onOk={handleConfirmAddNewVaccineShot}
      />
      <ToastContainer />
    </Box>
  );
};
export default VaccineListInformation;
