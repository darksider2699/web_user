import { getAllTestResultRequest, getTestResultByDateRequest, addListTestResultRequest } from "../../api";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTestResult = createAsyncThunk(
  "covidTest/getAllTestResult",
  async () => {
    console.log("Covid TEst Slice");
    const result = await getAllTestResultRequest()
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

export const getTestResultByDate = createAsyncThunk(
  "covidTest/getTestResultByDate",
  async (param) => {
    console.log("param", param);
    const result = await getTestResultByDateRequest(param ? param : "")
      .then((res) => res)
      .catch((message) => message);
    return result;
  }
);
export const addListTestResult = createAsyncThunk("covidTest/addListTestResult", async (param, thunkAPI) => {
  console.log("param", param);
  const {listTestAdded, cb} = param;
  const result = await addListTestResultRequest({listTestAdded, cb})
    .then((res) => {
      console.log("res",res);
      cb();
      return res;
    })
    .catch((message) => {
      toast.error("Login Fail. Check Your Network !");
      throw new Error(message);
    });
  return result;
});
const covidTestSlice = createSlice({
  name: "covidTestSlice",
  initialState: {
    testResultList: {
      current: [],
      loading: false,
      success: false,
    },
    testResultByDateList: {
      current: [],
      loading: false,
      success: false,
    }
  },
  reducers: {},
  extraReducers: {
    //medicalUserList
    [getAllTestResult.pending]: (state, action) => {
      state.testResultList.loading = true;
    },
    [getAllTestResult.fulfilled]: (state, action) => {
      state.testResultList.current = action.payload;
      state.testResultList.loading = false;
      state.testResultList.success = true;
    },
    [getAllTestResult.rejected]: (state, action) => {
      state.testResultList.loading = false;
      state.testResultList.success = false;
    },
    //Test Result By Date List
    [getTestResultByDate.pending]: (state) => {
      state.testResultByDateList.loading = true;
    },
    [getTestResultByDate.fulfilled]: (state, action) => {
      state.testResultByDateList.current = action.payload;
      state.testResultByDateList.loading = false;
      state.testResultByDateList.success = true;
    },
    [getTestResultByDate.rejected]: (state) => {
      state.testResultByDateList.loading = false;
      state.testResultByDateList.success = false;
    },
  },
});

const { reducer, actions } = covidTestSlice;
export const {} = actions;
export default reducer;
