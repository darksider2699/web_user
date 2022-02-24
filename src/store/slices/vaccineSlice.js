import {
    getAllVaccineTypeRequest,
  } from "../../api";
  import { toast } from "react-toastify";
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  
  export const getAllVaccineType = createAsyncThunk(
    "vaccine/getAllVaccineType",
    async () => {
      console.log("Hello question slice");
      const result = await getAllVaccineTypeRequest()
        .then((res) => {
          return res;
        })
        .catch((message) => {
          toast.error("Get Data Fail. Check Your Network !");
          throw new Error(message);
        });
      return result;
    }
  );
  const vaccineSlice = createSlice({
    name: "vaccineSlice",
    initialState: {
      vaccineTypeList: {
        current: [],
        loading: false,
        success: false,
      },
    },
    reducers: {},
    extraReducers: {
      //questionList
      [getAllVaccineType.pending]: (state, action) => {
        state.vaccineTypeList.loading = true;
      },
      [getAllVaccineType.fulfilled]: (state, action) => {
        state.vaccineTypeList.current = action.payload;
        state.vaccineTypeList.loading = false;
        state.vaccineTypeList.success = true;
      },
      [getAllVaccineType.rejected]: (state, action) => {
        state.vaccineTypeList.loading = false;
        state.vaccineTypeList.success = false;
      },
    },
  });
  
  const { reducer, actions } = vaccineSlice;
  export const {} = actions;
  export default reducer;
  