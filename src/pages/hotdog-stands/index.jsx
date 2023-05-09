import Map from "@/components/map/Mapbox";
import styles from "../styles/hotdog-stands.module.scss";
import fs from "fs";
import path from "path";
import Navbar from "@/components/navbar/Navbar";

const HotdogStand = ({ stands }) => {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.hotdogStand}>5413254132452asdasdasd</div>
        <div className={styles.mapWrapper}>
          <Map stands={stands} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  // Read the JSON file
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Pass the data to the page component as props
  return {
    props: {
      stands: standsData,
    },
  };
}

export default HotdogStand;
