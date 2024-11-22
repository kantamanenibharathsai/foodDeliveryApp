import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseURL, endPoints} from '../../config/locals/Config';

export interface RegisterUserReqInterface {
  name: string;
  mobile_no: string;
  email: string;
  password: string;
  country_code: string;
  state: string;
  role: string;
}

export interface SendOTPReqInterface {
  mobile_no: string;
  country_code: string;
}

export interface verifyOTPReqInterface {
  mobile_no: string;
  country_code: string;
  otp: string;
}

export interface loginReqInterface {
  mobile_no: string;
  password: string;
  role: string;
  country_code: string;
}

export type ApiStatusConstants = 'Initial' | 'Loading' | 'Success' | 'Failed';

export interface AuthStateInterface {
  registerStatus: ApiStatusConstants;
  registerSuccessMsg: string;
  registerErrMsg: string;
  sendOTPStatus: ApiStatusConstants;
  sendOTPSuccessMsg: string;
  sendOTPFailureMsg: string;
  verifyOTPStatus: ApiStatusConstants;
  verifyOTPSuccessMsg: string;
  verifyOTPFailureMsg: string;
  loginStatus: ApiStatusConstants;
  loginSuccessMsgToken: string;
  loginErrMsg: string;
  updatePasswordStatus: ApiStatusConstants;
  updatePasswordSuccessMsg: string;
  updatePasswordFailureMsg: string;
}

const initialState: AuthStateInterface = {
  registerStatus: 'Initial',
  registerSuccessMsg: '',
  registerErrMsg: '',
  sendOTPStatus: 'Initial',
  sendOTPSuccessMsg: '',
  sendOTPFailureMsg: '',
  verifyOTPStatus: 'Initial',
  verifyOTPSuccessMsg: '',
  verifyOTPFailureMsg: '',
  loginStatus: 'Initial',
  loginSuccessMsgToken: '',
  loginErrMsg: '',
  updatePasswordStatus: 'Initial',
  updatePasswordSuccessMsg: '',
  updatePasswordFailureMsg: '',
};

interface RegisterSuccessAPIUser {
  name: string;
  email: string;
  mobile_no: string;
  id: string;
}

export interface UpdatePasswordReqInterface {
  country_code: string;
  mobile_no: string;
  newPassword: string;
  confirmPassword: string;
}

const setRegisterAPIData = async (apiData: RegisterSuccessAPIUser) => {
  const selectedCountryCode = await AsyncStorage.getItem('selectedCountryCode');
  await AsyncStorage.setItem(
    'registerAPIData',
    JSON.stringify({...apiData, selectedCountryCode}),
  );
};

export const registerAction = createAsyncThunk(
  'registerAction',
  async (payload: RegisterUserReqInterface, {rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(`${baseURL}/${endPoints.SIGNUP}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const result = await response.json();

      setRegisterAPIData(result.user);
      return result;
    } catch (err) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const sendOTPAction = createAsyncThunk(
  'sendOTPaction',
  async (payload: SendOTPReqInterface, {rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${baseURL}/${endPoints.SEND_OTP}`, options);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const sendOtpData = await response.json();
      return sendOtpData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const verifyOTPAction = createAsyncThunk(
  'verifyOTPaction',
  async (payload: verifyOTPReqInterface, {rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(
        `${baseURL}/${endPoints.VERIFY_OTP}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const verifyOtpData = await response.json();

      return verifyOtpData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const loginAction = createAsyncThunk(
  'loginAction',
  async (payload: loginReqInterface, {rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(`${baseURL}/${endPoints.LOGIN}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const loginData = await response.json();
      if (loginData?.data?.jwtToken)
        await AsyncStorage.setItem('jwtToken', loginData?.data?.jwtToken);
 
      return loginData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const updatePasswordAction = createAsyncThunk(
  'updatePasswordAction',
  async (payload: UpdatePasswordReqInterface, {rejectWithValue}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(
        `${baseURL}/${endPoints.UPDATE_PASSWORD}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const updatePasswordData = await response.json();
      return updatePasswordData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerAction.pending, state => {
      state.registerStatus = 'Loading';
      state.registerSuccessMsg = '';
      state.registerErrMsg = '';
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {

      state.registerStatus = 'Success';
      state.registerSuccessMsg = 'User Registered Successfully';
      state.registerErrMsg = '';
    });
    builder.addCase(registerAction.rejected, (state, action) => {

      state.registerStatus = 'Failed';
      state.registerSuccessMsg = '';
      state.registerErrMsg = action.payload as string;
    });

    builder.addCase(sendOTPAction.pending, state => {
      state.sendOTPStatus = 'Loading';
      state.sendOTPSuccessMsg = '';
      state.sendOTPFailureMsg = '';
    });
    builder.addCase(sendOTPAction.fulfilled, (state, action) => {

      state.sendOTPStatus = 'Success';
      state.sendOTPSuccessMsg = action.payload.data?.otp || '';
      state.sendOTPFailureMsg = '';
    });
    builder.addCase(sendOTPAction.rejected, (state, action) => {
      state.sendOTPStatus = 'Failed';
      state.sendOTPSuccessMsg = '';
      state.sendOTPFailureMsg = action.payload as string;
    });

    builder.addCase(verifyOTPAction.pending, state => {
      state.verifyOTPStatus = 'Loading';
      state.verifyOTPSuccessMsg = '';
      state.verifyOTPFailureMsg = '';
    });
    builder.addCase(verifyOTPAction.fulfilled, (state, action) => {

      state.verifyOTPStatus = 'Success';
      state.verifyOTPSuccessMsg = action.payload.data?.message || '';
      state.verifyOTPFailureMsg = '';
    });
    builder.addCase(verifyOTPAction.rejected, (state, action) => {
      state.verifyOTPStatus = 'Failed';
      state.verifyOTPSuccessMsg = '';
      state.verifyOTPFailureMsg = action.payload as string;
    });

    builder.addCase(loginAction.pending, state => {
      state.loginStatus = 'Loading';
      state.loginSuccessMsgToken = '';
      state.loginErrMsg = '';
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {

      state.loginStatus = 'Success';
      state.loginSuccessMsgToken = action.payload.data?.jwtToken || '';
      state.loginErrMsg = '';
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loginStatus = 'Failed';
      state.loginSuccessMsgToken = '';
      state.loginErrMsg = action.payload as string;
    });

    builder.addCase(updatePasswordAction.pending, state => {
      state.updatePasswordStatus = 'Loading';
      state.updatePasswordSuccessMsg = '';
      state.updatePasswordFailureMsg = '';
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.updatePasswordStatus = 'Success';
      state.updatePasswordSuccessMsg = action.payload.data.message;
      state.updatePasswordFailureMsg = '';
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.updatePasswordStatus = 'Failed';
      state.updatePasswordSuccessMsg = '';
      state.updatePasswordFailureMsg = '';
    });
  },
});

export default AuthSlice.reducer;
