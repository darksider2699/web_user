import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanyUserInformation,
  getUserMedicalInformation,
  addNewDailyCheckout,
} from "../../store/slices/userSlice";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@material-ui/core/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YesNoModal from "../../components/YesNoModal";
import moment from "moment";
import DailyCheckoutList from "../DailyCheckout/DailyCheckoutList";

export default function Login() {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState();
  const [isOpenYesNoModal, setIsOpenYesNoModal] = useState(false);
  useEffect(() => {
    const tempArr = [...localStorage.getItem("list_draft").split(",")];
    setSelectedRows(tempArr);
  }, []);
  const listUser = useSelector(
    (state) => state.userStore.listCompanyUserInformation.current
  );
  const dailyCheckoutInformationList =
    useSelector(
      (state) => state.userStore.medicalUserInformation.current.dailyCheckouts
    ) || [];
  useEffect(() => {
    dispatch(getAllCompanyUserInformation());
    dispatch(getUserMedicalInformation());
  }, []);
  const convertJobTitle = (input) => {
    let result = input?.map((value, index) => {
      return value.name + " - level: " + value.level;
    });
    return result.map((item, index) => (index ? ", " : "") + item).join("");
  };
  const convertDataForTableUser = (input) => {
    let result = input?.map((value, index) => {
      return {
        id: value.id + "",
        username: value.user.account.username,
        name: value.user.firstName + " " + value.user.lastName,
        companyEmail: value.companyEmail,
        jobTitle: value.jobTitles[0]?.name
          ? convertJobTitle(value.jobTitles)
          : "--",
        department: value.department?.name ? value.department?.name : "--",
      };
    });
    return result;
  };
  const listData = convertDataForTableUser(listUser);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "companyEmail", headerName: "Company Email", width: 130 },
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
  ];
  //   const [selectionModel, setSelectionModel] = useState(() =>
  //     listData.filter((r) => templateSelected.includes(r.id)).map((r) => r.id)
  //   );
  const handleSaveDraftClick = () => {
    localStorage.setItem("list_draft", selectedRows);
    toast("Save draft succesfully!");
  };
  const openYesNoModal = () => {
    setIsOpenYesNoModal(true);
  };
  const handleSelectionModelChange = (ids) => {
    console.log(ids);
    setSelectedRows(ids);
  };
  const handleAddNewDailyCheckout = async () => {
    let listIdContactToday = selectedRows.map((index) => parseInt(index));
    console.log(listIdContactToday);
    await dispatch(
      addNewDailyCheckout({
        dateRecord: moment(new Date()).format("YYYY-MM-DD"),
        listIdContactToday: listIdContactToday,
        cb: () => {
          toast("Add new daily checkout success!");
          setIsOpenYesNoModal(false);
          dispatch(getUserMedicalInformation());
        },
      })
    );
  };
  let sortedDailyCheckoutInformationList = [...dailyCheckoutInformationList];
  sortedDailyCheckoutInformationList.sort(function compare(a, b) {
    var dateA = new Date(a.dateRecord);
    var dateB = new Date(b.dateRecord);
    return dateB - dateA;
  });
  const lastRecord = sortedDailyCheckoutInformationList[0];

  const isCheckedout = () => {
    let lastCheckout = moment(new Date(lastRecord?.dateRecord)).format(
      "YYYY-MM-DD"
    );
    let today = moment(new Date()).format("YYYY-MM-DD");
    console.log("inside function", lastCheckout, today);
    return lastCheckout === today;
  };
  console.log(isCheckedout());
  if (!isCheckedout()) {
    return (
      <div>
        <Box justifyContent={"space-between"} display={"flex"}>
          <Button
            variant="outlined"
            color={"primary"}
            style={{ margin: "10px 0 20px 0px " }}
            type="save"
            onClick={handleSaveDraftClick}
          >
            Save draft
          </Button>
          <Button
            variant="outlined"
            style={{ margin: "10px 0 20px 0px ", color: "green" }}
            type="submit"
            onClick={openYesNoModal}
          >
            Submit
          </Button>
        </Box>
        <Box>
          <DataGrid
            rows={listData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            onSelectionModelChange={(ids) => {
              handleSelectionModelChange(ids);
            }}
            rowsPerPageOptions={[5]}
            checkboxSelection
            selectionModel={selectedRows}
          />
        </Box>
        <YesNoModal
          isModalVisible={isOpenYesNoModal}
          hideModal={() => {}}
          title={"Confirm"}
          message={"Are you sure you want to submit your daily checkout?"}
          okText={"OK"}
          cancelText={"Cancel"}
          onCancel={() => {
            setIsOpenYesNoModal(false);
          }}
          onOk={handleAddNewDailyCheckout}
        />
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <Box>
        <Typography align="center" variant="h4" style={{ color: "green" }} gutterBottom>
          You finished your checkout process. You can check all your daily
          checkout down below
        </Typography>
        <DailyCheckoutList list={sortedDailyCheckoutInformationList} />
      </Box>
    );
  }
}
