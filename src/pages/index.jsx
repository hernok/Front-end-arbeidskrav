import styles from "./styles/index.module.scss";
import fs from "fs";
import path from "path";
import LoginForm from "../components/login/LoginForm";
import Navbar from "@/components/navbar/Navbar";

export default function Home({ stand }) {
  return (
    <div className={styles.mainWrapper}>
      <Navbar />
      <LoginForm />
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return {
    props: {
      stand: standData,
    },
  };
}
