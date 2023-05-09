import React, { useState } from "react";
import styles from "./HotdogStandCard.module.scss";

const HotdogStandCard = ({ stand }) => {
  const [showReviews, setShowReviews] = useState(false);
  const averageRating = calculateAverageRating(stand.reviews);

  function calculateAverageRating(reviews) {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    return (total / reviews.length).toFixed(1);
  }

  return (
    <div className={styles.standCard}>
      <img
        src={`/assets/images/${stand.image}`}
        alt={stand.alt}
        className={styles.standImage}
      />

      <div className={styles.standInfo}>
        <h2 className={styles.standName}>{stand.stand_name}</h2>
        <p className={styles.standDescription}>{stand.description}</p>
        <p className={styles.standRating}>Average Rating: {averageRating}</p>
        <button
          onClick={() => setShowReviews(!showReviews)}
          className={styles.reviewsButton}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
        {showReviews && (
          <div className={styles.reviewsDropdown}>
            {stand.reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <h3>{review.name}</h3>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotdogStandCard;
