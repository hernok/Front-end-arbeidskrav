import fs from "fs";
import path from "path";
import ReviewForm from "@/components/review/ReviewForm";

const HotdogStand = ({ stand }) => {
  return (
    <>
      <ReviewForm id={stand.id} reviews={stand.reviews} />
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
