import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  IStateSendOpt,
  IThunkInterface,
  IUserSignUpData,
} from '../../config/Interface';
import {baseURL, endPoints} from '../../config/locals/Config';

export interface AuthState {
  [x: string]: any;
  userInfo: {
    email: string;
    full_name: string;
    id: string;
    mobile_no: string;
    role: string;
  };
}

export const handleSignUp = createAsyncThunk(
  'user/signup',
  async (data: IUserSignUpData, {fulfillWithValue, rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(baseURL + '/' + endPoints.SIGNUP, options);

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();

      return result;
    } catch (err) {
      return rejectWithValue('Internal server error');
    }
  },
);

export const handleSendOtp = createAsyncThunk(
  'user/Otp',
  async (data: IStateSendOpt, {fulfillWithValue, rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(baseURL + '/' + endPoints.SEND_OTP, options);

      if (!res.ok) {
        const errorData = await res.json();

        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();

      return result;
    } catch (err) {
      return rejectWithValue('Internal server error');
    }
  },
);

export const handleVerifyOtp = createAsyncThunk(
  'user/otpVerify',
  async (
    data: {
      country_code: string;
      mobile_no: string;
      otp: string;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(baseURL + '/' + endPoints.VERIFY_OTP, options);

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData?.error?.error);
      }
      const result = await res.json();
      return result?.data?.message;
    } catch (err) {
      return rejectWithValue('Something Went Wong');
    }
  },
);

export const handleLogin = createAsyncThunk(
  'user/signup',
  async (
    data: IThunkInterface['IStateLogin'],
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(baseURL + '/' + endPoints.LOGIN, options);
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();
      await AsyncStorage.setItem('userInfo', JSON.stringify(result.data.user));
      return result.data.jwtToken;
    } catch (err) {
      return rejectWithValue('Internal server error');
    }
  },
);

export const handleUpdatePassword = createAsyncThunk(
  'user/signup',
  async (
    data: IThunkInterface['updataPassword'],
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(
        baseURL + '/' + endPoints.UPDATE_PASSWORD,
        options,
      );
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();
      return result.data.message;
    } catch (err) {
      return rejectWithValue('Internal server error');
    }
  },
);

const initialState: AuthState = {
  userInfo: {
    email: '',
    full_name: '',
    id: '',
    mobile_no: '',
    role: '',
  },
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    loginUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: buider => {},
});

export const {loginUserInfo} = AuthSlice.actions;

export default AuthSlice.reducer;
