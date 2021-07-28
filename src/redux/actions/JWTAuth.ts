import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { AuthUser } from "../../types/models/AuthUser";
import { AppActions } from "../../types";
import { Dispatch } from "redux";
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  SIGN_IN_REQ_SUCCED,
  SIGN_IN_REQ_REFRESHED,
  SIGN_UP_START,
  AuthActions,
  UPDATE_USER,
  REQ_SUCCEDD,
  REQ_STARTED,
  REQ_FAILED,
  REQ_FINISHED,
} from "../../types/actions/Auth.actions";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import {Cookies} from 'react-cookie';
import { loaduserLocations } from "./Locations";
import { clearCart, fetchCart, fetchCartitems } from "./Cart";
import { clearFavorite, fetchFavoriteProducts, loadFavoriteProducts } from "./Favorities";

export const onReqSignInSuceed = (): AuthActions => {
  return {
    type: SIGN_IN_REQ_SUCCED,
  };
};

export const OnSignUpStart = (): AuthActions => {
  return {
    type: SIGN_UP_START,
  };
};

export const onSingInRefresh = (): AuthActions => {
  return {
    type: SIGN_IN_REQ_REFRESHED,
  };
};

export const onJwtUserReqSignUp = (body: {
  // first_name: string;
  // last_name: string;
  phone_number: string;
  // email: string;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    try {
      const res = await jwtAxios.post("user/request-register/", body);
      console.log("signup req finished", res);
      dispatch({
        type: REQ_SUCCEDD
      })
      dispatch(onReqSignInSuceed());
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: REQ_FAILED,
        payload: err.response.data,
      })
    }
  };
};

export const updateUser = (data: any): AuthActions => {
  return {
    type: UPDATE_AUTH_USER,
    payload: getUserObject(data),
  }
}

export const onJwtUserSignUp = (otp: string) => {
  const body = {
    code: otp,
  };
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    try {
      const res = await jwtAxios.post("user/register/", body);
      console.log("signup  finished", res);
      dispatch(onReqSignInSuceed());
      // localStorage.setItem("token", res.data.token);
      const cookies = new Cookies();
      cookies.set("token", res.data.token, { path: "/" });
      
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
      dispatch({
        type: REQ_FINISHED,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };
};

export const onReqSignIn = (phone_number: string) => {
  const body = {
    phone_number: phone_number,
  };
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: REQ_STARTED
    })
    try {
      const res = await jwtAxios.post("/user/request-login/", body);
      console.log("SigninReq Succeed", res);
      dispatch({
        type: REQ_SUCCEDD
      })
      dispatch(onReqSignInSuceed());
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: REQ_FAILED,
        payload: err.response.data,
      })
    }
  };
};

export const onJwtSignIn = (otp: string) => {
  const body = {
    code: otp,
  };
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    try {
      const res = await jwtAxios.post("user/login/", body);
      console.log("Signin Succeed", res);
      // localStorage.setItem("token", res.data.token);
      const cookies = new Cookies();
      cookies.set("token", res.data.token, {path: "/"});
     
      dispatch(setJWTToken(res.data.token));
      dispatch(onSingInRefresh());
      dispatch({
        type: REQ_FINISHED,
      });
      await loadJWTUser(dispatch);
      await fetchCartitems(dispatch);
      await fetchCart(dispatch);
      await loadFavoriteProducts(dispatch);
      
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };
};

export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
  // dispatch(fetchStart());
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get("user/");
    dispatch(fetchSuccess());
    console.log("res.data", res.data);
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: getUserObject(res.data),
    });
  } catch (err) {
    console.log("error!!!!", err);
    dispatch(fetchError(err));
  }
};

export const loadAuthUser = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get("user/");
      dispatch(fetchSuccess());
      console.log("res.data", res.data);
      dispatch({
        type: UPDATE_AUTH_USER,
        payload: getUserObject(res.data),
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };
};

export const setJWTToken = (token: string | null): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

const getUserObject = (authUser: any): any => {
  return {
    id: authUser.id,
    first_name: authUser.first_name,
    last_name: authUser.last_name,
    phone_number: authUser.phone_number,
    home_phone_number: authUser.home_phone_number,
    national_code: authUser.national_code,
    email: authUser.email,
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({ type: SIGNOUT_AUTH_SUCCESS });
      dispatch(fetchSuccess());
      // localStorage.removeItem("token");
      const cookies = new Cookies();
      cookies.remove("token");
      dispatch(setJWTToken(null));
      setAuthToken(null);
      dispatch(clearCart());
      dispatch(clearFavorite());
    }, 500);
  };
};

export const authCheckStatus = () => {
  return (dispatch: Dispatch<any>) => {
    const cookies = new Cookies();
      // cookies.remove("token");
      const token = cookies.get('token');
    // const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onJWTAuthSignout());
    } else {
      dispatch(setJWTToken(token));
    }
  };
};
