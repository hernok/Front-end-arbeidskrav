import fs from "fs";
import path from "path";
import styles from "../styles/hotdog-stand.module.scss";
import ReviewForm from "@/components/review/ReviewForm";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { useState, useEffect } from "react";

const HotdogStand = ({ stand }) => {
  const [standData, setStandData] = useState(stand);
  const averageRating = calculateAverageRating(standData.reviews);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`/api/reviews?id=${stand.id}`);
    if (!response.ok) {
      console.error("Failed to fetch stand data:", response.statusText);
      return;
    }

    const updatedStandData = await response.json();
    setStandData(updatedStandData);
  };

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
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.hotdogStand}>
          <Image
            className={styles.standImage}
            src={`/assets/images/${stand.image}`}
            alt={stand.alt}
            width={900}
            height={500}
          ></Image>
          {standData.image ? (
            <div className={styles.reviewForm}>
              <ReviewForm
                id={standData.id}
                reviews={standData.reviews}
                refreshData={fetchData}
              />
            </div>
          ) : (
            <div className={styles.reviewForm}>
              <p>
                This stand has been closed for reviews <br />
                You have to wait until it is back up to leave a review
              </p>
            </div>
          )}
        </div>
        {standData.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <>
            <p>Average Rating: {averageRating}</p>
            {standData.reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <h3>{review.name}</h3>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const stands = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const paths = stands.map((stand) => ({
    params: { id: stand.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const id = params?.id;
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  console.log(standData);

  return {
    props: {
      stand: standData[id],
    },
  };
};

export default HotdogStand;
