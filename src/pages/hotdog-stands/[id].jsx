import fs from "fs";
import path from "path";
import styles from "../styles/hotdog-stand.module.scss";
import ReviewForm from "@/components/review/ReviewForm";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

const HotdogStand = ({ stand }) => {
  const averageRating = calculateAverageRating(stand.reviews);

  function calculateAverageRating(reviews) {
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
            width={900}
            height={500}
          ></Image>
          <div className={styles.reviewForm}></div>

          <ReviewForm id={stand.id} reviews={stand.reviews} />
        </div>
        <div className={styles.reviews}>
          <p>Average Rating: {averageRating}</p>
          {stand.reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <h3>{review.name}</h3>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
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

  return {
    props: {
      stand: standData[id],
    },
  };
};

export default HotdogStand;
