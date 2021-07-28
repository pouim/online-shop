import React, { useState } from "react";
import { Form, FormikProps, withFormik } from "formik";
import { Button } from "@components/button/button";
import toast, { Toaster } from "react-hot-toast";
import {
  FieldWrapper,
  Heading,
} from "@features/user-profile/my-location/address-card/address-card.style";
import TextField from "@components/forms/text-field";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { Cookies } from "react-cookie";
// Shape of form values
interface FormValues {
  name: string;
  email: string;
  title: string;
  description: string;
}

// The type of props MyForm receives
interface MyFormProps {}

const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: "",
      email: "",
      title: "",
      description: "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("نام خود را وارد نمایید"),
    email: Yup.string()
      .email("ایمیل به درستی وارد نشده است")
      .required("ایمیل خود را وارد نمایید"),
    title: Yup.string().required("موضوع پیام را وارد نمایید"),
    description: Yup.string().required("متن پیام را وارد نمایید"),
  }),

  handleSubmit: async (values) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    const body = {
      ...values
    }
    try {
      console.log("posting new message started");
      const res = await jwtAxios.post("user/contact/", body);
      console.log("posting new message succedd", res.data);
      toast.success("پیغام شما با موفقیت ثبت شد", {
        duration: 4000,
        style: {
          minWidth: "500px",
        },
      });
      values.name = "";
      values.email = "";
      values.title = "";
      values.description = "";
    } catch (error) {
      toast.error("متاسفانه در ثبت پیغام شما خطایی رخ داد", {
        duration: 4000,
        style: {
          minWidth: "500px",
        },
      });
      console.log("posting new message failed", error.response.data);
    }
  },
});
const ContacUsForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,

    handleReset,
    isSubmitting,
  } = props;

  const [loading, setloading] = useState(false);

  return (
    <Form>
      <Toaster position="top-center" />
      <Heading>ارسال پیام به ما</Heading>
      <FieldWrapper>
        <TextField
          id="name"
          as="input"
          placeholder="نام و نام خانوادگی"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          id="email"
          as="input"
          type="email"
          placeholder="ایمیل"
          error={touched.email && errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="title"
          as="input"
          placeholder="موضوع"
          error={touched.title && errors.title}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="description"
          as="textarea"
          placeholder="متن پیام"
          error={touched.description && errors.description}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        loading={loading}
        type="submit"
        style={{ width: "100%", height: "44px" }}
      >
        تایید و ارسال پیام
      </Button>
    </Form>
  );
};

export default FormEnhancer(ContacUsForm);
