import React, { useState } from "react";
import styles from "./HotdogStandEditCard.module.scss";
import Link from "next/link";
import Image from "next/image";

const HotdogStandEditCard = ({ stand }) => {
  const averageRating = calculateAverageRating(stand.reviews);

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
      return "No ratings";
    }
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    return (total / reviews.length).toFixed(1);
  }

  return (
    <div className={styles.standCard}>
      <Image
        width={500}
        height={800}
        src={`/assets/images/${stand.image}`}
        alt={stand.alt}
        className={styles.standImage}
      />
      <div className={styles.contentWrapper}>
        <Link
          key={stand.id}
          href={`/edit-stands/${stand.id}`}
          className={styles.standLink}
          passHref
        >
          <div className={styles.standInfo}>
            <h2 className={styles.standName}>{stand.stand_name}</h2>
            <p className={styles.standDescription}>{stand.description}</p>
            <p className={styles.standRating}>
              Average Rating: {averageRating}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HotdogStandEditCard;
