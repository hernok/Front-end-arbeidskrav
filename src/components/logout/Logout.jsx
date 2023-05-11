import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Cookies from "js-cookie";
import styles from "./Logout.module.scss";
import { useRouter } from "next/router";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    if (user !== null) {
      Cookies.remove("user");
      setUser(null);
      router.push("/");
    } else {
      alert("You must be logged in to log out");
    }
  };

  return (
    <span className={styles.logout__span} onClick={handleLogout}>
      Log out
    </span>
  );
};

export default Logout;
