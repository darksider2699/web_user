import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getAllMedicalInformationRequest, getCheckinByDateRequest} from "../../api";
import { toast } from "react-toastify";

export const getAllMedicalInformation = createAsyncThunk("checkin/getListCheckin", async () => {
    const result = await getAllMedicalInformationRequest()
      .then((res) => {
        return res;
      })
      .catch((message) => {
        toast.error("Get Data Fail. Check Your Network !");
        throw new Error(message);
      });
    return result;
  });
  export const getCheckinByDate = createAsyncThunk(
    "user/getCheckinByDate",
    async (param) => {
      console.log("param", param)
      const result = await getCheckinByDateRequest(param ? param : "")
        .then((res) => res)
        .catch((message) => message);
      return result;
    }
  );

  const checkinSlice = createSlice({
    name: "checkinSlice",
    initialState:{
      medicalUserList: {
        current: {},
        loading: false,
        success: false,
      },
      checkinList: {
        current: {},
        loading: false,
        success: false,
      }
      
    },
    reducers: {},
    extraReducers:{
      //medicalUserList
      [getAllMedicalInformation.pending]: (state, action) =>{
        state.medicalUserList.loading = true;
      },
      [getAllMedicalInformation.fulfilled]: (state, action) => {
        state.medicalUserList.current = action.payload;
        state.medicalUserList.loading = false;
        state.medicalUserList.success = true;
      },
      [getAllMedicalInformation.rejected]: (state, action) => {
        state.medicalUserList.loading = false;
        state.medicalUserList.success = false;
      },
      //Checkedin List
      [getCheckinByDate.pending]: (state) => {
        state.checkinList.loading = true;
      },
      [getCheckinByDate.fulfilled]: (state, action) => {
        state.checkinList.current= action.payload;
        state.checkinList.loading = false;
        state.checkinList.success = true;
      },
      [getCheckinByDate.rejected]: (state) => {
        state.checkinList.loading = false;
        state.checkinList.success = false;
      },

    }
  })

  const {reducer, actions} = checkinSlice;
  export const {} = actions;
  export default reducer