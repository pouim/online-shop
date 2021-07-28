import { SIGUNUSED } from "constants";
import { type } from "os";
import { TypeOf } from "yup";
import { AuthUser } from "../models/AuthUser";

export const UPDATE_AUTH_USER = "UPDATE_AUTH_USER";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const USER_LOADED = "USER_LOADED";
export const SIGNOUT_AUTH_SUCCESS = "SIGNOUT_AUTH_SUCCESS";
export const SIGN_IN_REQ_SUCCED = "SIGN_IN_REQ_SUCCED";
export const SIGN_IN_REQ_REFRESHED = "SIGN_IN_REQ_REFRESHED";
export const AUTH_CHECK_STATUS = "AUTH_CHECK_STATUS";
export const SIGN_UP_START = "SIGN_UP_START";
export const UPDATE_USER = "UPDATE_USER";
export const REQ_STARTED = "REQ_STARTED";
export const REQ_FAILED = "REQ_FAILED";
export const REQ_SUCCEDD = "REQ_SUCCEDD";
export const REQ_FINISHED = "REQ_FINISHED";


export interface reqFinished {
  type: typeof REQ_FINISHED;
}

export interface reqStarted {
  type: typeof REQ_STARTED;
}

export interface reqFailed {
  type: typeof REQ_FAILED;
  payload: any;
}

export interface reqSucced {
  type: typeof REQ_SUCCEDD;
}
export interface updateUser {
  type: typeof UPDATE_USER;
  payload: any;
}

export interface SignupStart {
  type: typeof SIGN_UP_START;
}

export interface SetAuthTokenActions {
  type: typeof SET_AUTH_TOKEN;
  payload: string | null;
}
export interface SigninReqSucced {
  type: typeof SIGN_IN_REQ_SUCCED;
}

export interface UpdateAuthUserActions {
  type: typeof UPDATE_AUTH_USER;
  payload: AuthUser | null;
}

export interface UserLoadedActions {
  type: typeof USER_LOADED;
}

export interface SignoutAuthUserActions {
  type: typeof SIGNOUT_AUTH_SUCCESS;
}
export interface SinginRefreshed {
  type: typeof SIGN_IN_REQ_REFRESHED;
}

export interface authCheckStatus {
  type: typeof AUTH_CHECK_STATUS;
}

export type AuthActions =
  | updateUser
  | UpdateAuthUserActions
  | SetAuthTokenActions
  | UserLoadedActions
  | SignoutAuthUserActions
  | SinginRefreshed
  | authCheckStatus
  | SignupStart
  | SigninReqSucced
  | reqSucced
  | reqStarted
  | reqFailed
  | reqFinished;
