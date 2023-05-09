import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../../utils/authentication";
import UserContext from "../../context/UserContext";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(username, password);

    if (user) {
      setUser(user);
      router.push("/hotdog-stands");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <form className={styles["form-container"]} onSubmit={handleSubmit}>
      <label className={styles["form-label"]} htmlFor="username">
        Username:
      </label>
      <input
        className={styles["form-input"]}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className={styles["form-label"]} htmlFor="password">
        Password:
      </label>
      <input
        className={styles["form-input"]}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles["form-button"]} type="submit">
        Log In
      </button>
    </form>
  );
};
export default LoginForm;
