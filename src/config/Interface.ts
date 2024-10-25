import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

export interface ICarousel {
    item: {
        id: number;
        img: string;
        title?: string;
        title1?: string;
        title2?: string;
    };
    carousel: {
        id: number;
        img: number;
    };
}

export interface IPasscodeInputField {
    placeholder?: string;
    text: string;
    value: string;
    onChangeText?: (text: string) => void;
    icon?: string;
    getOpt?: (text: string) => void;
    onBlur?: () => void;
    onSubmit?: () => void;
    errorText?: string;
    isForgotPass?: boolean;
}
export interface IEditProfile {
    confirmPassword: string;
    email: string;
    name: string;
    oldpassword: string;
    password: string;
    phone: string;
}
export interface IPropSubmitButton {
    text: string;
    icon?: string;
    onSubmit?: () => void;
    disabled?: boolean;
    pending?: boolean;
}

export interface INavigation {
    navigation: NavigationProp<ParamListBase>;
}

export interface ISignupState {
    confirmPassword: string;
    email: string;
    name: string;
    password: string;
    phone: string;
    state: string;
}

export interface ILoginInputField {
    placeholder?: string;
    iconName?: string;
    value: string;
    onChangeText?: (text: string) => void;
    icon?: string;
    onBlur?: (text: string) => void;
    errorText?: string;
}

export interface IStateSelect {
    _index: number;
    lable: string;
    value: string;
}

export interface IPropsChoice {
    data: {
        hotel: string;
        id: number;
        img: ImageSourcePropType | undefined;
        price: number;
        title: string;
    }[];
    heading?: string;
    headingFontSize?: number;
}

export interface IPropRenderItem {
    Description: string;
    id: number;
    name: string;
    revImg: { rImg: number; rid: number }[];
    userImg: number;
    rating: number;
}
export interface IPropModel {
    rImg: number;
    rid: number;
}

export interface IUserSignUpData {
    name: string;
    mobile_no: string;
    email: string;
    password: string;
    country_code: string;
    state: string;
    role: string;
}

export interface IStateSendOpt {
    mobile_no: string;
    country_code: string;
}

export interface IThunkInterface {
    IStateLogin: {
        mobile_no: string;
        password: string;
        role: string;
        country_code: string;
    };
    updataPassword: {
        country_code: string;
        mobile_no: string;
        newPassword: string;
        confirmPassword: string;
    };
}

export interface IResponse {
    error?: { message?: string };
    meta?: {
        aborted?: boolean;
        arg: {
            country_code?: string;
            mobile_no?: string;
            password?: string;
            role?: string;
        };
        condition?: boolean;
        rejectedWithValue?: boolean;
        requestId?: string;
        requestStatus?: string;
    };
    payload?: {
        data?: { message?: string | undefined } | undefined;
    };
    type?: string;
}