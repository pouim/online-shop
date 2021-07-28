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
import Countdown from "react-countdown";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { onJwtSignIn, onJwtUserSignUp } from "@store/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@store/store";




export default function OTPModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [otp, setOpt] = useState("");
  const { loading } = useSelector((state: AppState) => state.common);
  const dispatch = useDispatch();
  const [shouldSend, setShouldSend] = useState(false);

  const auth = useSelector((state: AppState) => state.auth);
  const { otpType } = auth;

  const inputRef = useRef<any>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const loginCallback = (e: any) => {
    e.preventDefault();
    if(otpType === 'signIn') {
      dispatch(onJwtSignIn(otp));
    } else  {
      dispatch(onJwtUserSignUp(otp));
    }
     
    // closeModal();
    // }
  };

  const onResendOtpCodeHandler = () => {
    shouldSend && alert("sent");
  };

  return (
    <Wrapper>
      <Container>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center">
          <div>
            <h2>تایید هویت</h2>
          </div>
          <div>
            <img src="/logo.png" style={{ height: 50, width: 90 }} />
          </div>
        </div>
        <form
          onSubmit={loginCallback}
          className="my-5"
          style={{ direction: "rtl" }}
        >
          <Label>ارسال کد</Label>
          <Input
            type="number"
            ref={inputRef}
            placeholder="کد ارسالی به شماره همراه خود را وارد نمایید"
            value={otp}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setOpt(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
          <div className="d-flex align-items-center mr-2">
            <Offer
              style={{ cursor: "pointer" }}
              onClick={onResendOtpCodeHandler}
            >
              ارسال مجدد بعد از
            </Offer>
            <Countdown
              className="mr-2"
              date={Date.now() + 10000}
              daysInHours={true}
              onComplete={() => setShouldSend(true)}
            />
          </div>

          <button
            className="btn btn-primary btn-block mx-auto mt-3"
            style={{ width: "40%" }}
            type="submit"
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
