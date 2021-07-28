import React, { useContext, useEffect, useRef, useState } from "react";
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
  HelperText,
} from "./authentication-form.style";
import { AuthContext } from "@context/auth/auth.context";
import { closeModal } from "@redq/reuse-modal";
import { Input } from "@components/forms/input";
import TextField from "@components/forms/text-field";
import { Label } from "@components/forms/label";
import Link from "next/link";
import jwtAxios from "src/axios-config/jwtAxios";
import { useDispatch, useSelector } from "react-redux";
import { onReqSignIn, OnSignUpStart } from "@store/actions";
import { AppState } from "@store/store";
export default function SignInModal() {

  const [phoneNumber, setPhonenumber] = React.useState("");
  const dispatch = useDispatch();
  const commonState = useSelector((state: AppState) => state.common);
  const {error} = useSelector((state: AppState) => state.auth);
  const { loading } = commonState;
  const inputRef = useRef<any>();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const toggleSignUpForm = () => {
     dispatch(OnSignUpStart());
  };

  const toggleOTPForm = (e: any) => {
    e.preventDefault();
    dispatch(onReqSignIn(phoneNumber));
  };

  return (
    <Wrapper>
      <Container>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center">
          <div>
            <h2>ورود</h2>
          </div>
          <div>
            <img src="/logo.png" style={{ height: 50, width: 90 }} />
          </div>
        </div>
        <form
          // onSubmit={}
          className="my-5"
          style={{ direction: "rtl" }}
        >
          <Label>شماره همراه</Label>
          <Input
            ref={inputRef}
            type="tel"
            placeholder="مثال : 09123456789"
            value={phoneNumber}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPhonenumber(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
          {error && error.phone_number && <Label style={{color: 'red'}}>شماره همراه وارد شده یافت نشد</Label> } 
          <div className="d-flex">
            <Offer style={{ padding: "   0" }}>
              حساب کاربری ندارید؟
              <LinkButton
                type="button"
                onClick={toggleSignUpForm}
                className="mx-1"
              >
                ثبت نام
              </LinkButton>
              کنید
            </Offer>
          </div>

          <button
            className="btn btn-primary btn-block mx-auto mt-3"
            style={{ width: "40%" }}
            onClick={toggleOTPForm}
            value="default action"
          >
            ادامه
          </button>
        </form>

        <HelperText style={{ padding: "5px 0 30px" }}>
          با ورود و یا ثبت نام در سایت شما
          <Link href="/">
            <a className="mx-2">شرایط و قوانین</a>
          </Link>
          استفاده از سرویس های سایت
          <Link href="/">
            <a className="mx-2">قوانین حریم خصوصی</a>
          </Link>
          آن را می‌پذیرید
        </HelperText>
      </Container>
    </Wrapper>
  );
}
