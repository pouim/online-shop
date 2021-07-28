import React, { FC, useContext, useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { closeModal } from "@redq/reuse-modal";
import TextField from "@components/forms/text-field";
import { Button } from "@components/button/button";
import ReactStars from "react-rating-stars-component";
import { FieldWrapper, Heading } from "./add-comment.style";
import { ProfileContext } from "@context/profile/profile.context";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-styled-flexboxgrid";
import { Label } from "@components/forms/label";
import { Input } from "@components/forms/input";
import jwtAxios from "src/axios-config/jwtAxios";
import { addNewLoction } from "@store/actions/Locations";




const AddNewComment: FC<any> = ({productId}) => {
    const [loading, setloading] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState<any>(null);
    const {user} = useSelector(state => state.auth)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
    if (
      comment
    ) {
      const newComment = {
        text: comment,
        rate: rating,
        product: productId,

      };
      try {
        console.log("posting new comment started");
        setloading(true);
        const res = await jwtAxios.post("comments/", newComment);
        console.log("posting new comment succed", res.data);
        setloading(false);
        setComment("");
        setRating(1);
      } catch (error) {
        console.log("posting new comment failed", error);
        setloading(false);
        setComment("");
        setRating(1);
      }
    }
  };
  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  console.log('user:', user, 'id:', productId, 'rate:', rating, 'comment:',  comment);
  return (
    <form style={{ width: "100%" }}>
      {/* <Heading>اضافه کردن مکان جدید</Heading> */}
      <>
        <TextField
          id="text"
          as="textarea"
          value={comment}
          placeholder="نظر خود را بنویسید"
          onChange={(e) => setComment(e.target.value)}
        />
        <div style={{direction: 'rtl'}}>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={35}
          activeColor="#ffd700"
          
        />
        </div>
       
      </>
      <Button
        onClick={handleSubmit}
        className="mt-4 mx-auto "
        type="submit"
        loading={loading}
        style={{ height: "44px", width: "100%" }}
      >
        تایید و ثبت نظر
      </Button>
    </form>
  );
};

export default AddNewComment;
