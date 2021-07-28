import React, { useContext } from 'react';
import SignInForm from './login';
import RegisterForm from './register';
import OTPForm from './OTP';
import ForgotPassForm from './forgot-password';
import SuccessForm from './success';
import { AuthContext } from '@context/auth/auth.context';
import { useSelector } from 'react-redux';
import { AppState } from '@store/store';

export default function AuthenticationForm() {
  const authState = useSelector((state: AppState) => state.auth);
  const { currentForm } = authState;
  let RenderForm = SuccessForm;

  if (currentForm === 'signIn') {
    RenderForm = SignInForm;
  }

  if (currentForm === 'otp') {
    RenderForm = OTPForm;
  }

  if (currentForm === 'signUp') {
    RenderForm = RegisterForm;
  }

  if (currentForm === 'forgotPass') {
    RenderForm = ForgotPassForm;
  }

  if (currentForm === 'success') {
    RenderForm = SuccessForm;
  }

  return <RenderForm />;
}
