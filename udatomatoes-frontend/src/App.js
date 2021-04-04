import "./App.css";
import { useState, useEffect } from "react";
import logo from "./img/udatomatoes.png";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import axios from "axios";

function App() {
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    axios.get("http://localhost:3000/reviews").then((res) => {
      setReviews(res.data);
    });
  };

  useEffect(() => {
    getReviews();
  }, [reviews]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{ width: "18rem" }} alt="" />
      </header>
      <Add reviews={reviews} setReviews={setReviews} />
      <div className="reviews">
        {reviews.map((item) => {
          return (
            <div className="review">
              <h3>Title: {item.movie_title}</h3>
              <h3>Review: {item.movie_review}</h3>
              <h3>Rating: {item.movie_rating}</h3>
              <Edit id={item.id} reviews={reviews} setReviews={setReviews} />
              <Delete id={item.id} reviews={reviews} setReviews={setReviews} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
