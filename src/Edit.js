import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    data["id"] = props.id;
    updateReview(data);
  };

  const updateReview = (data) => {
    axios.put("http://localhost:3000/reviews", data).then((res) => {
      props.setReviews(
        props.reviews.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                movie_title: item.movie_title,
                movie_review: item.movie_review,
                movie_rating: item.movie_rating,
              }
            : item;
        })
      );
    });
  };

  return (
    <form className="add-review" onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit Review</h4>
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
