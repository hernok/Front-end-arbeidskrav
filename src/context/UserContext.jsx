import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
