import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Add(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    addReview(data);
  };

  const addReview = (data) => {
    axios.post("http://localhost:3000/reviews", data).then(() => {
      props.setReviews([
        ...props.reviews,
        {
          data,
        },
      ]);
    });
  };

  return (
    <form className="add-review" onSubmit={handleSubmit(onSubmit)}>
      <h4>Add Review</h4>
      <input
        type="text"
        placeholder="Movie Title"
        name="movie_title"
        ref={register({ required: true, maxLength: 40 })}
      />
      <input
        type="text"
        placeholder="Review"
        name="movie_review"
        ref={register({ required: true, maxLength: 450 })}
      />
      <input
        type="number"
        placeholder="Rating"
        name="movie_rating"
        ref={register({ required: true, max: 5, min: 0 })}
      />

      <input id="btn" type="submit" />
    </form>
  );
}
