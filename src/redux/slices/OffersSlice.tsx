import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseURL, endPoints} from '../../config/locals/config';

export const handleTodaySpeial = createAsyncThunk(
  'today special',
  async (_, {fulfillWithValue, rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
      };
      const res = await fetch(baseURL + '/' + endPoints.TODAY_SPECIAL, options);
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error.error);
      }
      const result = await res.json();

      return result.data.product;
    } catch (err) {
      return rejectWithValue('Internal server error');
    }
  },
);
interface IOfferSliceState {
  isPending: boolean;
  todaySpecials: {
    _id: string;
    businessId: string;
    category: string;
    categoryId: string;
    createdAt: string;
    description: string;
    discountPrice: number;
    images: string[];
    isActive: boolean;
    isBestChoice: boolean;
    isTodaySpecial: boolean;
    name: string;
    packingCharge: number;
    price: number;
    quantity: number;
    sizes: string[];
    specialDayDate: string;
    subCategory: string;
    units: string;
    updatedAt: string;
    weight: number;
  }[];
}
const initialState = {
  isPending: false,
  todaySpecials: [],
};
const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(handleTodaySpeial.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(handleTodaySpeial.fulfilled, (state, action) => {
        state.isPending = false;
        state.todaySpecials = action.payload;
      })
      .addCase(handleTodaySpeial.rejected, (state, action) => {
        state.isPending = true;
      });
  },
});
export default OffersSlice.reducer;
