import { AppState } from '@store/store';
import {AppActions} from '../../types';
import {REQ_FAILED, REQ_FINISHED, REQ_SUCCEDD, SET_AUTH_TOKEN, SIGNOUT_AUTH_SUCCESS, SIGN_IN_REQ_REFRESHED, SIGN_IN_REQ_SUCCED, SIGN_UP_START, UPDATE_AUTH_USER, USER_LOADED} from '../../types/actions/Auth.actions';
import {AuthUser} from '../../types/models/AuthUser';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  currentForm: string;
  otpType: string;
  error: any;
}

const INIT_STATE: AuthState = {
  loading: true,
  user: null,
  token: null,
  currentForm: "signIn",
  otpType: "signIn",
  error: null,
};

const Auth = (state = INIT_STATE, action: AppActions): AuthState => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SIGNOUT_AUTH_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case SIGN_IN_REQ_SUCCED: {
      return {
        ...state,
        currentForm: 'otp',
      };
    }
    case SIGN_UP_START: {
      return {
        ...state,
        currentForm: 'signUp',
        otpType: 'signUp,'
      };
    }
    case REQ_FINISHED: {
      return {
        ...state,
        currentForm: 'success',
        error: null,
      };
    }
    case REQ_SUCCEDD: {
      return {
        ...state,
        error: null,
      };
    }
    case REQ_FAILED: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case SIGN_IN_REQ_REFRESHED: {
      return {
        ...state,
        currentForm: 'signIn',
        otpType: 'signIn',
        error: null,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
export default Auth;
