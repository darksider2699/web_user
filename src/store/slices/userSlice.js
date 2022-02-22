import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInRequest,
  getUserMedicalInformationRequest,
  addNewDailyCheckinRequest,
  getAllCompanyUserInformationRequest
} from "../../api";
import { toast } from "react-toastify";

export const login = createAsyncThunk("user/login", async (param, thunkAPI) => {
  const { username, password, cb } = param;
  const result = await signInRequest({ username, password, cb })
    .then((res) => {
      console.log("res", res);
      localStorage.setItem("roles", JSON.stringify(res.roles));
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("idUser", res.id);
      cb();
      return res;
    })
    .catch((message) => {
      toast.error("Login Fail. Check Your Network !");
      throw new Error(message);
    });
  return result;
});

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("roles");
  localStorage.removeItem("token");
});
export const getUserMedicalInformation = createAsyncThunk(
  "account/getUserMedicalInformation",
  async () => {
    console.log("User slice");
    const result = await getUserMedicalInformationRequest()
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
export const addNewDailyCheckin = createAsyncThunk(
  "dailyCheckin/addNewDailyCheckin",
  async (param) => {
    console.log("Add new checkin slice", param);
    const result = await addNewDailyCheckinRequest(param)
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
export const getAllCompanyUserInformation = createAsyncThunk(
  "user/listCompanyUserInformation",
  async () => {
    const result = await getAllCompanyUserInformationRequest()
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
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    account: {
      current: {},
      loading: false,
      success: false,
    },
    medicalUserInformation: {
      current: {},
      loading: false,
      success: false,
    },
    listCompanyUserInformation: {
      current: [],
      loading: false,
      success: false
    }
  },
  reducers: {},
  extraReducers: {
    //login
    [login.pending]: (state, action) => {
      state.account.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.account.current = action.payload;
      state.account.loading = false;
      state.account.success = true;
    },
    [login.rejected]: (state, action) => {
      state.account.current = {};
      state.account.loading = false;
      state.account.success = false;
    },

    //logout
    [logout.fulfilled]: (state, action) => {
      state.account.current = {};
      state.account.loading = false;
      state.account.success = false;
    },
    [getUserMedicalInformation.pending]: (state, action) => {
      state.medicalUserInformation.loading = true;
    },
    [getUserMedicalInformation.fulfilled]: (state, action) => {
      state.medicalUserInformation.current = action.payload;
      state.medicalUserInformation.loading = false;
      state.medicalUserInformation.success = true;
    },
    [getUserMedicalInformation.rejected]: (state, action) => {
      state.medicalUserInformation.loading = false;
      state.medicalUserInformation.success = false;
    },
    [getAllCompanyUserInformation.pending]: (state, action) => {
      state.listCompanyUserInformation.loading = true;
    },
    [getAllCompanyUserInformation.fulfilled]: (state, action) => {
      state.listCompanyUserInformation.current = action.payload;
      state.listCompanyUserInformation.loading = false;
      state.listCompanyUserInformation.success = true;
    },
    [getAllCompanyUserInformation.rejected]: (state, action) => {
      state.listCompanyUserInformation.loading = false;
      state.listCompanyUserInformation.success = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
