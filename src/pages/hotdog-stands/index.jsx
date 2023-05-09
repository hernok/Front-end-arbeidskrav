import Map from "@/components/map/Mapbox";
import styles from "../styles/hotdog-stands.module.scss";
import fs from "fs";
import path from "path";
import Navbar from "@/components/navbar/Navbar";
import HotdogStandCard from "@/components/cards/hotdogStandCard/HotdogStandCard";

const HotdogStand = ({ stands }) => {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.hotdogStand}>
          {stands.map((stand) => {
            return <HotdogStandCard stand={stand} />;
          })}
          {stands.map((stand) => {
            return <HotdogStandCard stand={stand} />;
          })}
        </div>
        <div className={styles.mapWrapper}>
          <Map stands={stands} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return {
    props: {
      stands: standsData,
    },
  };
}

export default HotdogStand;
