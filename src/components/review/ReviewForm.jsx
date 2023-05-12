import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import styles from "./ReviewForm.module.scss";

const ReviewForm = ({ id, reviews }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hasReviewed &&
      user &&
      (user.role === "premium" || user.role === "admin")
    ) {
      try {
        const maxReviewId = Math.max(...reviews.map((review) => review.id), 0);
        const reviewId = maxReviewId + 1;

        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            standId: id,
            review: { id: reviewId, comment, rating, name },
          }),
        });

        if (response.ok) {
          console.log("Review submitted:", { comment, rating });
          setName("");
          setComment("");
          setRating(1);
          setHasReviewed(true);
          alert("Review submitted");
        } else {
          throw new Error("Error submitting review");
        }
      } catch (error) {
        console.error(error);
        alert("Error submitting review");
      }
    } else if (hasReviewed) {
      alert("You may only submit one review at a time");
    } else {
      alert("Only premium and admin users can leave a review.");
    }
  };

  if (user) {
    return (
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h3>Leave a comment!</h3>
        <label htmlFor="Name">Name:</label>
        <input
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>
    );
  } else {
    return <p>Please login to leave a comment</p>;
  }
};

export default ReviewForm;
