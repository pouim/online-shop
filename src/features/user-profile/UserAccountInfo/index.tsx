import React, { useContext, useEffect } from "react";
import { Col } from "react-styled-flexboxgrid";
import { openModal } from "@redq/reuse-modal";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";

import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
} from "./settings.style";

import { Button } from "@components/button/button";
import { Input } from "@components/forms/input";

import { Label } from "@components/forms/label";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/store";
import {
  authCheckStatus,
  fetchError,
  loadAuthUser,
  updateUser,
} from "@store/actions";
import { Form, Formik } from "formik";
import { Cookies } from "react-cookie";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  // const { state, dispatch } = useContext(ProfileContext);
  const { user } = useSelector((state: AppState) => state.auth);
  const { error } = useSelector((state: AppState) => state.common);

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    mobile: yup.string().required("وارد کردن شماره همراه اجباری است"),
    email: yup.string().email("ایمیل خود را صحیح وارد نکرده اید"),
    firstname: yup.string(),
    lastname: yup.string(),
    phone: yup.string(),
    nationalCode: yup.string(),
  });

  const handleSave = async (data: any, setErrors: any, setSubmitting: any) => {
    try {
      const body = {
        phone_number: data.mobile,
        email: data.email,
        first_name: data.firstname,
        last_name: data.lastname,
        home_phone_number: data.phone,
        national_code: data.nationalCode,
      };
      console.log("updating user profile started");
      setSubmitting(true);
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      const res = await jwtAxios.put("user/", body);
      dispatch(updateUser(res.data));
      console.log("updating user profile success", res);
      toast.success("اطلاعات شما با موفقیت ثبت شد", {
        duration: 4000,
        style: {
          minWidth: "250px",
        },
      });
      setSubmitting(false);
    } catch (error) {
      dispatch(fetchError(error.response.data));
      if (error.response.data.email) {
        toast.error("ایمیل وارد شده در سیستم وجود دارد", {
          duration: 4000,
          style: {
            minWidth: "250px",
          },
        });
      } else if (error.response.data.phone_number) {
        toast.error("کاربر با شماره همراه وارد شده وجود دارد", {
          duration: 4000,
          style: {
            minWidth: "250px",
          },
        });
      } else {
        toast.error("مشکلی در ثبت پروفایل بوجود آمد", {
          duration: 4000,
          style: {
            minWidth: "250px",
          },
        });
      }

      setSubmitting(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    dispatch(authCheckStatus());
    if (token) {
      setAuthToken(token);
      dispatch(loadAuthUser());
    }
  }, [dispatch]);

  return (
    <SettingsForm>
      <Toaster position="top-center" />
      <SettingsFormContent>
        <HeadingSection>
          <Title>اطلاعات حساب</Title>
        </HeadingSection>
        <Formik
          validateOnChange={true}
          initialValues={{
            firstname: (user && user.first_name) || "",
            lastname: (user && user.last_name) || "",
            mobile: (user && user.phone_number) || "",
            phone: (user && user.home_phone_number) || "",
            nationalCode: (user && user.national_code) || "",
            email: (user && user.email) || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setErrors, setSubmitting }) => {
            handleSave(data, setErrors, setSubmitting);
          }}
        >
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form autoComplete="off">
              <Row
                style={{
                  alignItems: "flex-end",
                  marginBottom: "50px",
                  direction: "rtl",
                }}
              >
                <Col xs={12} sm={5} md={5} lg={5}>
                  <Label>نام</Label>
                  <Input
                    type="text"
                    label="FirstName"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                    backgroundColor="#F7F7F7"
                    height="48px"
                  />
                </Col>

                <Col xs={12} sm={5} md={5} lg={5}>
                  <Label>نام خانوادگی</Label>
                  <Input
                    type="text"
                    label="LastName"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                    backgroundColor="#F7F7F7"
                    height="48px"
                  />
                </Col>

                <Col xs={12} sm={5} md={5} lg={5}>
                  <Label>شماره همراه</Label>
                  <Input
                    type="text"
                    label="Moble"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange("mobile")}
                    backgroundColor="#F7F7F7"
                    height="48px"
                  />
                  {touched.mobile && errors.mobile && (
                    <div style={{ textAlign: "right", color: "red" }}>
                      {errors.mobile}
                    </div>
                  )}
                </Col>

                <Col className="mt-3" xs={12} sm={5} md={5} lg={5}>
                  <Label>شماره ثابت</Label>
                  <Input
                    type="text"
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    backgroundColor="#F7F7F7"
                    height="48px"
                  />
                </Col>

                <Col xs={12} sm={5} md={5} lg={5}>
                  <Label>ایمیل</Label>
                  <Input
                    type="email"
                    name="email"
                    label="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    backgroundColor="#F7F7F7"
                    // intlInputLabelId="profileEmailField"
                  />
                  {touched.email && errors.email && (
                    <div style={{ textAlign: "right", color: "red" }}>
                      {errors.email}
                    </div>
                  )}
                </Col>

                <Col className="mt-3" xs={12} sm={5} md={5} lg={5}>
                  <Label>کد ملی</Label>
                  <Input
                    type="text"
                    label="NationalCode"
                    name="nationalCode"
                    value={values.nationalCode}
                    onChange={handleChange("nationalCode")}
                    backgroundColor="#F7F7F7"
                    height="48px"
                  />
                </Col>

                {/* <Col xs={12} sm={5} md={5} lg={5}>
            <Label>رمز عبور</Label>
            <Input
              type="password"
              label="FirstName"
              name="firstname"
              value={user && user.password}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
              height="48px"
            />
          </Col> */}

                <Col className="mt-5" xs={12} sm={5} md={5} lg={5}>
                  <Button
                    size="big"
                    style={{ width: "100%" }}
                    type="submit"
                    loading={isSubmitting}
                  >
                    تایید و ثبت مشخصات
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </SettingsFormContent>  
    </SettingsForm>
  );
};

export default SettingsContent;
