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

export default function SuccessModal() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 1000);
    setTimeout(() => {
        closeModal();
    }, 2500);
  }, []);

  const loaderClassName = checked
    ? "circle-loader load-complete"
    : "circle-loader";
  const checkClassName = checked ? "checkmark draw" : "checkmark notShow draw";
  return (
    <Wrapper>
      <Container style={{ minHeight: "300px" }}>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center">
          <div>
            <h2>خوش آمدید</h2>
          </div>
          <div>
            <img src="/logo.png" style={{ height: 50, width: 90 }} />
          </div>
        </div>
        <div className={loaderClassName} style={{marginTop: '2rem'}}>
          <div className={checkClassName}></div>
        </div>
      </Container>
    </Wrapper>
  );
}
