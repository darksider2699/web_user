import { getAllCovidCaseRequest} from "../../api";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCovidCase = createAsyncThunk(
    "covidCase/getAllCovidCase",
    async () => {
      console.log("Covid Case Slice");
      const result = await getAllCovidCaseRequest()
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
  const covidCaseSlice = createSlice({
  name: "covidCaseSlice",
  initialState: {
    covidCaseList: {
      current: [],
      loading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: {
    //medicalUserList
    [getAllCovidCase.pending]: (state, action) => {
      state.covidCaseList.loading = true;
    },
    [getAllCovidCase.fulfilled]: (state, action) => {
      state.covidCaseList.current = action.payload;
      state.covidCaseList.loading = false;
      state.covidCaseList.success = true;
    },
    [getAllCovidCase.rejected]: (state, action) => {
      state.covidCaseList.loading = false;
      state.covidCaseList.success = false;
    },
  },
});

const { reducer, actions } = covidCaseSlice;
export const {} = actions;
export default reducer;
