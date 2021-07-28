import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { closeModal } from "@redq/reuse-modal";
import TextField from "@components/forms/text-field";
import { Button } from "@components/button/button";

import { FieldWrapper, Heading } from "./address-card.style";
import { ProfileContext } from "@context/profile/profile.context";
import { useDispatch } from "react-redux";
import { Col } from "react-styled-flexboxgrid";
import { Label } from "@components/forms/label";
import { Input } from "@components/forms/input";
import jwtAxios from "src/axios-config/jwtAxios";
import { addNewLoction, editLoction } from "@store/actions/Locations";

// Shape of form values
interface FormValues {
  id?: number | null;
  name?: string;
  phone_number?: string;
  state?: string;
  city?: string;
  postal_code?: string;
  postal_address?: string;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
  type: any;
  locationID?: any;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.item.id || null,
      name: props.item.name || "",
      phone_number: props.item.phone_number || "",
      state: props.item.state || "",
      city: props.item.city || "",
      postal_code: props.item.postal_code || "",
      postal_address: props.item.postal_address || "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(" نام آدرس وارد نشده است"),
    phone_number: Yup.string().required("  شماره تماس وارد نشده است"),
    state: Yup.string().required(" نام منطقه وارد نشده است"),
    city: Yup.string().required(" نام شهر وارد نشده است"),
    postal_code: Yup.string().required("کد پستی وارد نشده است"),
    postal_address: Yup.string().required("آدرس وارد نشده است"),
  }),
  handleSubmit: (values) => {
    console.log(values, "values");
    // do submitting things
  },
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    item,
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
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (
      isValid &&
      values.postal_address &&
      values.postal_code &&
      values.city &&
      values.state &&
      values.phone_number &&
      values.name
    ) {
      const newLocation = {
        name: values.name,
        phone_number: values.phone_number,
        state: values.state,
        city: values.city,
        postal_code: values.postal_code,
        postal_address: values.postal_address,
      };
      if (props.type === 'add') {
        try {
          console.log('posting new address started');
          setloading(true);
          dispatch(addNewLoction(newLocation));
          const res = await jwtAxios.post('addresses/', newLocation);
          console.log('posting new address succed');
          setloading(false);
          
        } catch (error) {
          console.log('posting new address failed');
          setloading(false);
        }
      } else if (props.type === 'edit') {
        try {
          console.log(`updating  address ${props.item.id} started`);
          setloading(true);
          // dispatch(addNewLoction(newLocation));
          const res = await jwtAxios.put(`addresses/${props.item.id}/`, newLocation);
          dispatch(editLoction(res.data));
          console.log(`updating  address ${props.item.id} success`);
          setloading(false);
          
        } catch (error) {
          console.log(`updating  address ${props.item.id} failed`, error.response);
          setloading(false);
        }
      }
      closeModal();
    }
  };
  return (
    <Form>
      <Heading>{props.type === 'add' ? 'افزودن نشانی جدید': 'ویرایش نشانی' } </Heading>
      <FieldWrapper>
        <TextField
          id="name"
          as="input"
          placeholder="نام آدرس را وارد نمایید"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          id="phone_number"
          as="input"
          placeholder=" شماره تماس را وارد نمایید  "
          error={touched.phone_number && errors.phone_number}
          value={values.phone_number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          id="state"
          as="input"
          placeholder="نام منطقه را وارد نمایید"
          error={touched.state && errors.state}
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="city"
          as="input"
          placeholder=" نام شهر را وارد نمایید  "
          error={touched.city && errors.city}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="postal_code"
          as="input"
          placeholder=" کد پستی را وارد نمایید"
          error={touched.postal_code && errors.postal_code}
          value={values.postal_code}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="postal_address"
          as="textarea"
          placeholder="آدرس را وارد نمایید"
          error={touched.postal_address && errors.postal_address}
          value={values.postal_address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: "100%", height: "44px" }}
      >
        تایید و ثبت آدرس
      </Button>
    </Form>
  );
};

export default FormEnhancer(UpdateAddress);
