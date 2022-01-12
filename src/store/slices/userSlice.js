import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {signInRequest} from "../../api";
import { toast } from "react-toastify";

export const login = createAsyncThunk("user/login", async (param, thunkAPI) => {
    const { username, password, cb } = param;
    console.log("param", param);
    const result = await signInRequest({ username, password, cb })
      .then((res) => {
        console.log("res",res);
        localStorage.setItem("roles", JSON.stringify(res.roles));
        localStorage.setItem("token", res.access_token);
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

  const userSlice = createSlice({
    name: "userSlice",
    initialState:{
      account: {
        current: {},
        loading: false,
        success: false,
      }
    },
    reducers: {},
    extraReducers:{
      //login
      [login.pending]: (state, action) =>{
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
    }
  })

  const {reducer, actions} = userSlice;
  export const {} = actions;
  export default reducer