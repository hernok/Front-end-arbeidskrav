import styles from "./styles/index.module.scss";
import fs from "fs";
import path from "path";
import LoginForm from "../components/login/LoginForm";

export default function Home({ stand }) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export async function getStaticProps() {
  // Read the JSON file
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Pass the data to the page component as props
  return {
    props: {
      stand: standData,
    },
  };
}
