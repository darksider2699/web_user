import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getAllMedicalInformationRequest} from "../../api";
import { toast } from "react-toastify";

export const getAllMedicalInformation = createAsyncThunk("checkin/getListCheckin", async () => {
  console.log("Checkin Slices")
    const result = await getAllMedicalInformationRequest()
      .then((res) => {
        console.log("res checkin Slice",res);
        return res;
      })
      .catch((message) => {
        toast.error("Get Data Fail. Check Your Network !");
        throw new Error(message);
      });
    return result;
  });
  

  const checkinSlice = createSlice({
    name: "checkinSlice",
    initialState:{
      checkinList: {
        current: {},
        loading: false,
        success: false,
      }
    },
    reducers: {},
    extraReducers:{
      //checkinList
      [getAllMedicalInformation.pending]: (state, action) =>{
        state.checkinList.loading = true;
      },
      [getAllMedicalInformation.fulfilled]: (state, action) => {
        state.checkinList.current = action.payload;
        state.checkinList.loading = false;
        state.checkinList.success = true;
      },
      [getAllMedicalInformation.rejected]: (state, action) => {
        state.checkinList.current = {};
        state.checkinList.loading = false;
        state.checkinList.success = false;
      },

    }
  })

  const {reducer, actions} = checkinSlice;
  export const {} = actions;
  export default reducer