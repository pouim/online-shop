import React, { useContext, useState } from "react";
import Link from "next/link";
import { Input } from "@components/forms/input";
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
} from "./authentication-form.style";

import { AuthContext } from "@context/auth/auth.context";
import { Label } from "@components/forms/label";
import { useDispatch, useSelector } from "react-redux";
import { onJwtUserReqSignUp, onJwtUserSignUp, onSingInRefresh } from "@store/actions";
import { AppState } from "@store/store";

export default function ReisterModal() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { error } = useSelector((state: AppState) => state.auth);

  const toggleSignInForm = () => {
     dispatch(onSingInRefresh());
  };

  const onSignUp = (e: any) => {
    const body = {
      // first_name: firstName,
      // last_name: lastName,
      phone_number: phoneNumber,
      // email: email,
    };
    e.preventDefault();
    dispatch(onJwtUserReqSignUp(body));
  }

  return (
    <Wrapper>
      <Container>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center">
          <div>
            <h2>ثبت نام</h2>
          </div>
          <div>
            <img src="/logo.png" style={{ height: 50, width: 90 }} />
          </div>
        </div>
        <form className="my-5" style={{ direction: "rtl" }} onSubmit={onSignUp}>
          {/* <Label>نام</Label>
          <Input
            type="text"
            placeholder="مثال : محمد"
            value={firstName}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setFirstName(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          /> */}
          {/* <Label>نام خانوادگی</Label>
          <Input
            type="text"
            placeholder="مثال : محمدی"
            value={lastName}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setLastName(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          /> */}
          <Label>شماره همراه</Label>
          <Input
            type="tel"
            placeholder="مثال : 09123456789"
            value={phoneNumber}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPhoneNumber(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
           {error && error.phone_number && <Label style={{color: 'red'}}>شماره همراه وارد شده در سیستم موجود است</Label> } 
          {/* <Label>ایمیل</Label>
          <Input
            type="email"
            placeholder=" مثال: mohammad.mohammadi@gmail.com"
            value={email}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setEmail(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          /> */}
          <div className="d-flex">
            <Offer style={{ padding: "   0" }}>
              حساب کاربری دارید؟
              <LinkButton onClick={toggleSignInForm} className="mx-1" type="button">
                ورود
              </LinkButton>
              کنید
            </Offer>
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
