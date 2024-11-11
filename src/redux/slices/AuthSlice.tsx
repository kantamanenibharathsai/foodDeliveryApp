// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {
//   IStateSendOpt,
//   IThunkInterface,
//   IUserSignUpData,
// } from '../../config/Interface';
// import {baseURL, endPoints} from '../../config/locals/Config';

// export interface AuthState {
//   [x: string]: any;
//   userInfo: {
//     email: string;
//     full_name: string;
//     id: string;
//     mobile_no: string;
//     role: string;
//   };
// }

// export const handleSignUp = createAsyncThunk(
//   'user/signup',
//   async (data: IUserSignUpData, {fulfillWithValue, rejectWithValue}) => {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       };

//       const res = await fetch(baseURL + '/' + endPoints.SIGNUP, options);

//       if (!res.ok) {
//         const errorData = await res.json();
//         return rejectWithValue(errorData.error.error);
//       }
//       const result = await res.json();

//       return result;
//     } catch (err) {
//       return rejectWithValue('Internal server error');
//     }
//   },
// );

// export const handleSendOtp = createAsyncThunk(
//   'user/Otp',
//   async (data: IStateSendOpt, {fulfillWithValue, rejectWithValue}) => {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       };

//       const res = await fetch(baseURL + '/' + endPoints.SEND_OTP, options);

//       if (!res.ok) {
//         const errorData = await res.json();

//         return rejectWithValue(errorData.error.error);
//       }
//       const result = await res.json();

//       return result;
//     } catch (err) {
//       return rejectWithValue('Internal server error');
//     }
//   },
// );

// export const handleVerifyOtp = createAsyncThunk(
//   'user/otpVerify',
//   async (
//     data: {
//       country_code: string;
//       mobile_no: string;
//       otp: string;
//     },
//     {fulfillWithValue, rejectWithValue},
//   ) => {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       };

//       const res = await fetch(baseURL + '/' + endPoints.VERIFY_OTP, options);

//       if (!res.ok) {
//         const errorData = await res.json();
//         return rejectWithValue(errorData?.error?.error);
//       }
//       const result = await res.json();
//       return result?.data?.message;
//     } catch (err) {
//       return rejectWithValue('Something Went Wong');
//     }
//   },
// );

// export const handleLogin = createAsyncThunk(
//   'user/signup',
//   async (
//     data: IThunkInterface['IStateLogin'],
//     {fulfillWithValue, rejectWithValue},
//   ) => {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       };
//       const res = await fetch(baseURL + '/' + endPoints.LOGIN, options);
//       if (!res.ok) {
//         const errorData = await res.json();
//         return rejectWithValue(errorData.error.error);
//       }
//       const result = await res.json();
//       await AsyncStorage.setItem('userInfo', JSON.stringify(result.data.user));
//       return result.data.jwtToken;
//     } catch (err) {
//       return rejectWithValue('Internal server error');
//     }
//   },
// );

// export const handleUpdatePassword = createAsyncThunk(
//   'user/signup',
//   async (
//     data: IThunkInterface['updataPassword'],
//     {fulfillWithValue, rejectWithValue},
//   ) => {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       };
//       const res = await fetch(
//         baseURL + '/' + endPoints.UPDATE_PASSWORD,
//         options,
//       );
//       if (!res.ok) {
//         const errorData = await res.json();
//         return rejectWithValue(errorData.error.error);
//       }
//       const result = await res.json();
//       return result.data.message;
//     } catch (err) {
//       return rejectWithValue('Internal server error');
//     }
//   },
// );

// const initialState: AuthState = {
//   userInfo: {
//     email: '',
//     full_name: '',
//     id: '',
//     mobile_no: '',
//     role: '',
//   },
// };

// export const AuthSlice = createSlice({
//   name: 'Auth',
//   initialState,
//   reducers: {
//     loginUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//     },
//   },
//   extraReducers: buider => {},
// });

// export const {loginUserInfo} = AuthSlice.actions;

// export default AuthSlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { baseURL, endPoints } from '../../config/locals/config';
import networkCall from '../../config/Networkcalls';
// import {baseURL, endpoints} from '../../constants/Config';
// import networkCall from '../../utils/networkCalls';

export interface RegisterUserReqInterface {
  name: string;
  mobile_no: string;
  email: string;
  password: string;
  country_code: string;
  state: string;
  role: string;
}
interface LoginPayload {
  mobile_no: string;
  country_code: string;
  password: string;
  role: string;
}
interface UpdatePasswordPayload {
  mobile_no: string;
  country_code: string;
  newPassword: string;
  confirmPassword: string;
}
interface VerifyPasswordPayload {
  mobile_no: string;
  country_code: string;
  otp: string;
}
export interface AuthDataType {
  message: string | null;
  loading: boolean;
  registerLoading: boolean;
  token: null | string;
  phoneOrEmail: string;
  isOtpVerified: boolean;
  isCompleted: boolean;
  isSignInActive: boolean;
  otp: string;
  errorMassage: string;
  isLoginSuccess: boolean;
  user: {
    full_name: string;
    mobile_no: string;
    email: string;
    role: string;
    id: string;
  };
}

const initialState: AuthDataType = {
  message: null,
  loading: false,
  registerLoading: false,
  token: null,
  phoneOrEmail: '',
  isOtpVerified: false,
  isCompleted: false,
  isSignInActive: true,
  otp: '',
  errorMassage: '',
  isLoginSuccess: false,
  user: {
    full_name: '',
    mobile_no: '',
    email: '',
    role: '',
    id: '',
  },
};

const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};
const setOtp = async (otp: string) => {
  await AsyncStorage.setItem('otp', otp);
};

export const loginAction = createAsyncThunk(
  'loginAction',
  async (payload: LoginPayload, {rejectWithValue, fulfillWithValue}) => {
    console.log(payload, 'login credentials auth');
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const res = await fetch(baseURL + '/' + endPoints.LOGIN, options);
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData, '=======>error');
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();
      setToken(result.data.jwtToken);
      console.log(
        {token: result.data.jwtToken, user: result.data.user},
        '=======>success',
      );
      return fulfillWithValue(result);
    } catch (err) {
      console.log(err, '========>err');
      return rejectWithValue('Internal server error');
    }
  },
);

export const registerAction = createAsyncThunk(
  'registerAction',
  async (
    payload: RegisterUserReqInterface,
    {rejectWithValue, fulfillWithValue},
  ) => {
    // console.log(payload, 'signUp data');
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(baseURL + '/' + endPoints.SIGNUP, options);
      if (!response.ok) {
        const errorData = await response.json();
        // console.log(errorData, '=======>error signUp');
        return rejectWithValue(errorData.error.error);
      }
      const result = await response.json();
      return fulfillWithValue(result);
    } catch (err) {
      console.log(err, '========>err signUp');
      return rejectWithValue('Internal server error');
    }
  },
);
export const sendOTPaction = createAsyncThunk(
  'sendOTPaction',
  async (
    {mobile_no, country_code}: {mobile_no: string; country_code: string},
    {rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      mobile_no,
      country_code,
    };
    console.log(data, 'send otp');
    try {
      const response = await networkCall(
        endPoints.SEND_OTP,
        'POST',
        JSON.stringify(data),
      );
      if (response) {
        console.log(response, 'send otp auth', response.response.data.otp);
        setOtp(response.response.data.otp);
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const verifyOtpAction = createAsyncThunk(
  'verifyOtpAction',
  async (
    payload: VerifyPasswordPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    console.log(payload, 'verify data');

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const res = await fetch(baseURL + '/' + endPoints.VERIFY_OTP, options);
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData, '=======>error verify otp');
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();
      console.log(result, '=======> verify otp result');
      return fulfillWithValue(result);
    } catch (error) {
      console.log(error, 'error');
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const updatePasswordAction = createAsyncThunk(
  'updatePasswordAction',
  async (
    payload: UpdatePasswordPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    console.log(payload, 'updatePass data');

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      const res = await fetch(
        baseURL + '/' + endPoints.UPDATE_PASSWORD,
        options,
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData, '=======>error update Password');
        return rejectWithValue(errorData.error.error);
      }

      const result = await res.json();
      console.log(result, 'res UpdatePass');
      return fulfillWithValue(result);
    } catch (error) {
      console.log(error, '========>err');
      return rejectWithValue('Internal server error');
    }
  },
);

const Auth = createSlice({
  name: 'AuthSlice',
  initialState, 
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAction.pending, state => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload, 'login auth action');
      state.user = action.payload.data.user;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload, 'login error auth');
    });
    builder.addCase(registerAction.pending, state => {
      state.registerLoading = true;
      state.message = null;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.registerLoading = false;
      
      state.message = action.payload.response.error.error;
      console.log(action.payload, 'resiter auth');
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.registerLoading = false;
      state.message = 'Please try again!';
      console.log(action.payload, 'resiter error auth');
    });
    builder.addCase(sendOTPaction.pending, state => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(sendOTPaction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.response.data.otp, 'thunk');
      state.otp = action.payload.response.data.otp;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(sendOTPaction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
    builder.addCase(verifyOtpAction.pending, state => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(verifyOtpAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyOtpAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
    builder.addCase(updatePasswordAction.pending, state => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload, 'upPass action');
      state.message = action.payload.data.message;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
  },
});
export const {} = Auth.actions;
export default Auth.reducer;
