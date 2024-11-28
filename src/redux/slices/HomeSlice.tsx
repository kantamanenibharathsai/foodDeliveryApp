import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseURL, endPoints} from '../../config/locals/Config';
import {ImageSourcePropType} from 'react-native';

export type ApiStatusConstants = 'Initial' | 'Loading' | 'Success' | 'Failed';

export 
interface CategoryIdData {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BestChoicesObjectInterface {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: CategoryIdData;
  images: ImageSourcePropType[];
  subCategory: string;
  price: number;
  quantity: number;
  units: string;
  businessId: {
    location: {
      type: string;
      coordinates: number[];
    };
    _id: string;
    ownerId: string;
    businessName: string;
    ownerName: string;
    email: string;
    accountCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  discountPrice: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  isTodaySpecial: boolean;
  specialDayDate: null;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodaysSpecialGetInterface {
  name: string;
  description: string;
  category: string;
  categoryId: string;
  images: string[];
  subCategory: string;
  price: number;
  quantity: number;
  units: string;
  businessId: string;
  discountPrice: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  sizes: string[];
  isTodaySpecial: boolean;
  specialDayDate: string;
  isBestChoice: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantNearByGetInterface {
  _id: string;
  ownerId: string;
  businessName: string;
  ownerName: string;
  email: string;
  gstNo?: string;
  accountCompleted: boolean;
  location: {type: 'Point'; coordinates: [number, number]};
  createdAt: string;
  updatedAt: string;
  distance: number;
}

export interface TodaysSpecialGetNearByRestInterface {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  images: string[];
  subCategory: string;
  price: number;
  quantity: number;
  units: string;
  businessId: string;
  discountPrice: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  sizes: string[];
  isTodaySpecial: boolean;
  specialDayDate: string;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomeStateInterface {
  bestChoiceStatus: ApiStatusConstants;
  bestChoiceSuccessData: BestChoicesObjectInterface[];
  bestChoiceErrData: string;
  todaysSpecialGetStatus: ApiStatusConstants;
  todaysSpecialGetSuccessData: TodaysSpecialGetInterface[];
  todaysSpecialGetErrData: string;
  restNearByGetStatus: ApiStatusConstants;
  restNearByGetSuccessData: RestaurantNearByGetInterface[];
  restNearByGetErrData: string;
  bestChoiceNearByRestStatus: ApiStatusConstants;
  bestChoiceNearByRestSuccessData: BestChoiceNearByRestProductInterface[];
  bestChoiceNearByRestErrData: '';
  categoriesNearByRestStatus: ApiStatusConstants;
  categoriesNearByRestSuccessData: nearByRestCategoriesInterface[];
  categoriesNearByRestErrData: string;
  todaysSpecialRestNearByGetStatus: ApiStatusConstants;
  todaysSpecialRestNearByGetSuccessData: TodaysSpecialGetNearByRestInterface[];
  todaysSpecialRestNearByGetErrData: string;
  homeCategoriesGetStatus: ApiStatusConstants;
  homeCategoriesGetSuccessData: CategoryIdData[];
  homeCategoriesGetErrData: string;
}

export interface BestChoiceNearByRestProductInterface {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  images: string[];
  subCategory: string | null;
  price: number;
  quantity: number;
  units: string;
  businessId: string;
  discountPrice: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  isTodaySpecial: boolean;
  specialDayDate: string | null;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface nearByRestCategoriesInterface {
  _id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const initialState: HomeStateInterface = {
  bestChoiceStatus: 'Initial',
  bestChoiceSuccessData: [],
  bestChoiceErrData: '',
  todaysSpecialGetStatus: 'Initial',
  todaysSpecialGetSuccessData: [],
  todaysSpecialGetErrData: '',
  restNearByGetStatus: 'Initial',
  restNearByGetSuccessData: [],
  restNearByGetErrData: '',
  bestChoiceNearByRestStatus: 'Initial',
  bestChoiceNearByRestSuccessData: [],
  bestChoiceNearByRestErrData: '',
  categoriesNearByRestStatus: 'Initial',
  categoriesNearByRestSuccessData: [],
  categoriesNearByRestErrData: '',
  todaysSpecialRestNearByGetStatus: 'Initial',
  todaysSpecialRestNearByGetSuccessData: [],
  todaysSpecialRestNearByGetErrData: '',
  homeCategoriesGetStatus: 'Initial',
  homeCategoriesGetSuccessData: [],
  homeCategoriesGetErrData: '',
};

export const bestChoiceAction = createAsyncThunk(
  'bestChoiceAction',
  async (_, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.BEST_CHOICES}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const bestChoiceData = await response.json();
      return bestChoiceData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const todaysSpecialGetAction = createAsyncThunk(
  'todaysSpecialGetAction',
  async (_, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.TODAY_SPECIAL}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const todaySpecialsData = await response.json();
      return todaySpecialsData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const restNearByGetGetAction = createAsyncThunk(
  'restNearByGetGetAction',
  async (_, {rejectWithValue}) => {
    // console.log('restNearByGetGetActionFunccalled', '');
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const coordinates = await AsyncStorage.getItem('coordinates');
      let latitude: number = 17.4485833;
      let longitude: number = 78.3908033;
      if (coordinates) {
        const parsedCoordinates = JSON.parse(coordinates);
        latitude = parsedCoordinates.latitude;
        longitude = parsedCoordinates.longitude;
      }
      // `${baseURL}/${endPoints.REST_NEARBY}/?lat=${latitude}&long=${longitude}`,
      const response = await fetch(
        `${baseURL}/${endPoints.REST_NEARBY}/?lat=17.4485833&long=78.3908033`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const restNearByData = await response.json();
      // console.log("restNearByData", restNearByData);
      return restNearByData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const bestChoiceNearByRestAction = createAsyncThunk(
  'bestChoiceNearByRestAction',
  async (payload: string, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.BEST_CHOICES_NEARBY_REST}/${payload}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const bestChoiceData = await response.json();
      //  console.log('MMMMMMMM', bestChoiceData);
      return bestChoiceData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const nearByRestCategoriesGetAction = createAsyncThunk(
  'nearByRestCategoriesGetAction',
  async (_, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.CATEGORIES_GET_NEARBY_REST}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const categoriesData = await response.json();
      return categoriesData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const todaysSpecialGetRestNearByAction = createAsyncThunk(
  'todaysSpecialGetRestNearByAction',
  async (payload: string, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.TODAY_SPECIALS_REST_NEAR_BY}/${payload}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const todaySpecialsData = await response.json();
      return todaySpecialsData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

export const homeCategoriesGetAction = createAsyncThunk(
  'homeCategoriesGetAction',
  async (_, {rejectWithValue}) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken || '',
        },
      };
      const response = await fetch(
        `${baseURL}/${endPoints.CATEGORIES_GET_HOME}`,
        options,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.error || 'An error occurred');
      }
      const categoriesData = await response.json();
      return categoriesData;
    } catch (error) {
      return rejectWithValue('Network request failed');
    }
  },
);

const HomeSlice = createSlice({
  name: 'HomeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(bestChoiceAction.pending, state => {
      state.bestChoiceStatus = 'Loading';
      state.bestChoiceSuccessData = [];
      state.bestChoiceErrData = '';
    });
    builder.addCase(bestChoiceAction.fulfilled, (state, action) => {
      state.bestChoiceStatus = 'Success';
      state.bestChoiceSuccessData = action.payload.data.bestChoices;
      state.bestChoiceErrData = '';
    });
    builder.addCase(bestChoiceAction.rejected, (state, action) => {
      state.bestChoiceStatus = 'Failed';
      state.bestChoiceSuccessData = [];
      state.bestChoiceErrData = '';
    });

    builder.addCase(todaysSpecialGetAction.pending, state => {
      state.todaysSpecialGetStatus = 'Loading';
      state.todaysSpecialGetSuccessData = [];
      state.todaysSpecialGetErrData = '';
    });
    builder.addCase(todaysSpecialGetAction.fulfilled, (state, action) => {
      state.todaysSpecialGetStatus = 'Success';
      state.todaysSpecialGetSuccessData = action.payload.data.product;
      state.todaysSpecialGetErrData = '';
    });
    builder.addCase(todaysSpecialGetAction.rejected, (state, action) => {
      state.todaysSpecialGetStatus = 'Failed';
      state.todaysSpecialGetSuccessData = [];
      state.todaysSpecialGetErrData = '';
    });

    builder.addCase(restNearByGetGetAction.pending, state => {
      state.restNearByGetStatus = 'Loading';
      state.restNearByGetSuccessData = [];
      state.restNearByGetErrData = '';
    });
    builder.addCase(restNearByGetGetAction.fulfilled, (state, action) => {
      state.restNearByGetStatus = 'Success';
      state.restNearByGetSuccessData = action.payload;
      state.restNearByGetErrData = '';
    });
    builder.addCase(restNearByGetGetAction.rejected, (state, action) => {
      state.restNearByGetStatus = 'Failed';
      state.restNearByGetSuccessData = [];
      state.restNearByGetErrData = '';
    });

    builder.addCase(bestChoiceNearByRestAction.pending, state => {
      state.bestChoiceNearByRestStatus = 'Loading';
      state.bestChoiceNearByRestSuccessData = [];
      state.bestChoiceNearByRestErrData = '';
    });
    builder.addCase(bestChoiceNearByRestAction.fulfilled, (state, action) => {
      state.bestChoiceNearByRestStatus = 'Success';
      state.bestChoiceNearByRestSuccessData = action.payload.data.bestChoice;
      state.bestChoiceNearByRestErrData = '';
    });
    builder.addCase(bestChoiceNearByRestAction.rejected, (state, action) => {
      state.bestChoiceNearByRestStatus = 'Failed';
      state.bestChoiceNearByRestSuccessData = [];
      state.bestChoiceNearByRestErrData = '';
    });

    builder.addCase(nearByRestCategoriesGetAction.pending, state => {
      state.categoriesNearByRestStatus = 'Loading';
      state.categoriesNearByRestSuccessData = [];
      state.categoriesNearByRestErrData = '';
    });
    builder.addCase(
      nearByRestCategoriesGetAction.fulfilled,
      (state, action) => {
        console.log('Ccccccccccccc', action.payload.data.categories);
        state.categoriesNearByRestStatus = 'Success';
        state.categoriesNearByRestSuccessData = action.payload.data.categories;
        state.categoriesNearByRestErrData = '';
      },
    );
    builder.addCase(nearByRestCategoriesGetAction.rejected, (state, action) => {
      state.categoriesNearByRestStatus = 'Failed';
      state.categoriesNearByRestSuccessData = [];
      state.categoriesNearByRestErrData = '';
    });

    builder.addCase(todaysSpecialGetRestNearByAction.pending, state => {
      state.todaysSpecialRestNearByGetStatus = 'Loading';
      state.todaysSpecialRestNearByGetSuccessData = [];
      state.todaysSpecialRestNearByGetErrData = '';
    });
    builder.addCase(
      todaysSpecialGetRestNearByAction.fulfilled,
      (state, action) => {
        state.todaysSpecialRestNearByGetStatus = 'Success';
        state.todaysSpecialRestNearByGetSuccessData =
          action.payload.data.product;
        state.todaysSpecialRestNearByGetErrData = '';
      },
    );
    builder.addCase(
      todaysSpecialGetRestNearByAction.rejected,
      (state, action) => {
        state.todaysSpecialRestNearByGetStatus = 'Failed';
        state.todaysSpecialRestNearByGetSuccessData = [];
        state.todaysSpecialRestNearByGetErrData = '';
      },
    );

    builder.addCase(homeCategoriesGetAction.pending, state => {
      state.restNearByGetStatus = 'Loading';
      state.restNearByGetSuccessData = [];
      state.restNearByGetErrData = '';
    });
    builder.addCase(homeCategoriesGetAction.fulfilled, (state, action) => {
      state.restNearByGetStatus = 'Success';
      state.restNearByGetSuccessData = action.payload;
      state.restNearByGetErrData = '';
    });
    builder.addCase(homeCategoriesGetAction.rejected, (state, action) => {
      state.restNearByGetStatus = 'Failed';
      state.restNearByGetSuccessData = [];
      state.restNearByGetErrData = '';
    });
  },
});

export default HomeSlice.reducer;

// import {ImageSourcePropType} from 'react-native';
// export interface Reviews {
// _id: string;
// reviewerId: string;
// rating: number;
// description: string;
// status: boolean;
// images: string[];
// restaurantId: Restaurant;
// createdAt: string;
// updatedAt: string;
// }
// interface Restaurant {
// location: Location;
// _id: string;
// ownerId: string;
// businessName: string;
// ownerName: string;
// email: string;
// accountCompleted: boolean;
// createdAt: string;
// updatedAt: string;
// }
// interface Location {
// type: string;
// coordinates: number[];
// }

// export interface SingleBestChoiceItem {
// _id: string;
// name: string;
// description: string;
// category: string;
// categoryId: string;
// images: string[];
// subCategory: string;
// price: number;
// quantity: number;
// units: string;
// businessId: string;
// discountPrice: number;
// weight: number;
// isActive: boolean;
// packingCharge: number;
// sizes: string[];
// isTodaySpecial: boolean;
// specialDayDate: string | null;
// isBestChoice: boolean;
// createdAt: string;
// updatedAt: string;
// }
// export interface SingleTodaySpecial {
// _id: string;
// businessId: string;
// category: string;
// categoryId: string;
// createdAt: string;
// description: string;
// discountPrice: number;
// images: string[];
// isActive: boolean;
// isBestChoice: boolean;
// isTodaySpecial: boolean;
// name: string;
// packingCharge: number;
// price: number;
// quantity: number;
// sizes: string[];
// specialDayDate: string;
// subCategory: string;
// units: string;
// updatedAt: string;
// weight: number;
// }
// export interface BusinessData {
// _id: string;
// accountCompleted: boolean;
// businessName: string;
// createdAt: string;
// distance: number;
// email: string;
// location: Location;
// ownerId: string;
// ownerName: string;
// updatedAt: string;
// }
// export interface SingleBusinessData {
// _id: string;
// accountCompleted: boolean;
// businessName: string;
// createdAt: string;
// email: string;
// ownerId: string;
// ownerName: string;
// updatedAt: string;
// }
// export interface Product {
// _id: string;
// name: string;
// description: string;
// category: string;
// categoryId: string;
// images: string[];
// subCategory: string;
// price: number;
// quantity: number;
// units: string;
// businessId: string;
// discountPrice: number;
// weight: number;
// isActive: boolean;
// packingCharge: number;
// sizes: string[];
// isTodaySpecial: boolean;
// specialDayDate: string;
// isBestChoice: boolean;
// createdAt: string;
// updatedAt: string;
// }
// export interface CoordsPayload {
// latitude: number;
// longitude: number;
// }
// interface LocationDetails {
// ISO_3166_1_alpha_2: string;
// ISO_3166_1_alpha_3: string;
// ISO_3166_2: string[];
// _category: string;
// _normalized_city: string;
// _type: string;
// city: string;
// city_district: string;
// continent: string;
// country: string;
// country_code: string;
// county: string;
// neighbourhood: string;
// postcode: string;
// road: string;
// road_type: string;
// state: string;
// state_code: string;
// state_district: string;
// suburb: string;
// }

// export interface HomeDataType {
// message: string | null;
// loading: boolean;
// products: Product[];
// businessData: BusinessData[];
// singleBusiness: SingleBusinessData;
// singleTodaySpecial: SingleTodaySpecial[];
// singleBestChoiceData: SingleBestChoiceItem[];
// reviews: Reviews[];
// isActive: boolean;
// bestChoicesData: BestChoicesData[];
// searchAllProducts: SearchAllProducts[];
// searchHistoryData: SearchHistoryData[];
// shoppingCartData: {
// products: CartProduct[];
// totalPrice: number;
// _id: string;
// };
// allAddressData: AllAddress[];
// isAddressActive: boolean;
// allBusinessProducts: SearchAllProducts[];
// loadingAction: boolean;
// singleProductData: CartItem;
// trackOrderCurrentPage: number;
// locationDetails: LocationDetails | null;
// }

// export interface AddAddressPayload {
// flat_house_no: string;
// area_colony_street: string;
// address: string;
// country: string;
// city: string;
// state: string;
// mobile_no: string;
// user_id: string;
// isDefault: string;
// pincode: string;
// coordinates: {
// lat: number;
// long: number;
// };
// }

// export interface AddAddressData {
// country: string;
// pinCode: string;
// flat: string;
// area: string;
// landmark: string;
// city: string;
// state: string;
// }

// export interface SearchAllProducts {
// _id: string;
// name: string;
// description: string;
// category: string;
// categoryId: string;
// images: string[];
// subCategory: string;
// price: number;
// quantity: number;
// units: string;
// businessId: string;
// discountPrice: number;
// weight: number;
// isActive: boolean;
// packingCharge: number;
// isTodaySpecial: boolean;
// specialDay: string | null;
// isBestChoice: boolean;
// createdAt: string;
// updatedAt: string;
// }

// export interface SearchHistoryData {
// _id: string;
// search: string;
// userId: string;
// __v: number;
// }

// export interface CartItem {
// _id: string;
// name: string;
// description: string;
// category: string;
// categoryId: string;
// images: string[];
// subCategory?: string;
// price: number;
// quantity: number;
// units: string;
// businessId: string;
// discountPrice: number;
// weight: number;
// isActive: boolean;
// packingCharge: number;
// isTodaySpecial: boolean;
// specialDayDate?: string | null;
// isBestChoice: boolean;
// createdAt: string;
// updatedAt: string;
// sizes: string[];
// }
// export interface CartProduct {
// cartItem: CartItem;
// quantity: number;
// _id: string;
// }
// interface Coordinates {
// latitude: number;
// longitude: number;
// }

// export interface AllAddress {
// _id: string;
// address: string;
// area_colony_street: string;
// city: string;
// coordinates: Coordinates;
// country: string;
// createdAt: string;
// flat_house_no: string;
// isDefault: boolean;
// pincode: string;
// state: string;
// updatedAt: string;
// user_id: string;
// }
