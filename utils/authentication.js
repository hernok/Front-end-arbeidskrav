import users from "../public/users.json";
import Cookies from "js-cookie";

export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    Cookies.set("user", JSON.stringify(user), {
      expires: 10 / 1440,
      path: "/",
    });
    return user;
  }

  return null;
}
