import styles from "../styles/edit-stands.module.scss";
import fs from "fs";
import path from "path";
import Navbar from "@/components/navbar/Navbar";
import cookie from "cookie";
import HotdogStandEditCard from "@/components/cards/hotdogStandEditCard/HotdogStandEditCard";

const EditStands = ({ stands }) => {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.hotdogStand}>
          {stands.map((stand) => {
            return <HotdogStandEditCard key={stand.id} stand={stand} />;
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : {};
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (!user || user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const filePath = path.join(process.cwd(), "public", "data.json");
  const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return {
    props: {
      stands: standsData,
    },
  };
}

export default EditStands;
