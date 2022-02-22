import {
  getAllQuestionRequest,
} from "../../api";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllQuestion = createAsyncThunk(
  "question/getListQuestion",
  async () => {
    console.log("Hello question slice");
    const result = await getAllQuestionRequest()
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
const questionSlice = createSlice({
  name: "questionSlice",
  initialState: {
    questionList: {
      current: [],
      loading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: {
    //questionList
    [getAllQuestion.pending]: (state, action) => {
      state.questionList.loading = true;
    },
    [getAllQuestion.fulfilled]: (state, action) => {
      state.questionList.current = action.payload;
      state.questionList.loading = false;
      state.questionList.success = true;
    },
    [getAllQuestion.rejected]: (state, action) => {
      state.questionList.loading = false;
      state.questionList.success = false;
    },
  },
});

const { reducer, actions } = questionSlice;
export const {} = actions;
export default reducer;
