import {
  getAllQuestionRequest,
  getQuestionByIdRequest,
  editQuestionRequest,
  createNewQuestionRequest,
  deleteQuestionRequest
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
export const getQuestionById = createAsyncThunk(
  "question/getListQuestion",
  async (param) => {
    console.log("Hello question slice");
    const result = await getQuestionByIdRequest(param.id)
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

export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (param) => {
    console.log("Hello question slice", param);
    const result = await editQuestionRequest(
      param.id,
      param.label,
      param.answerRequest,
      param.rightAnswerPosition
    )
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
export const createNewQuestion = createAsyncThunk(
  "question/createNewQuestion",
  async (param) => {
    console.log("Hello question slice", param);
    const result = await createNewQuestionRequest(
      param.label,
      param.answerRequest,
      param.rightAnswerPosition,
      param.cb()
    )
      .then((res) => {
        param.cb();
        return res;
      })
      .catch((message) => {
        toast.error("Get Data Fail. Check Your Network !");
        throw new Error(message);
      });
    return result;
  }
);
export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (param) => {
    await deleteQuestionRequest(
      param.id,
    )
      .then((res) => {
        param.cb();
        console.log("res data", res.data)
        return res.data;
      })
      .catch((message) => {
        toast.error("Get Data Fail. Check Your Network !");
        console.log("msg error", message);
        throw new Error(message);
      });
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
