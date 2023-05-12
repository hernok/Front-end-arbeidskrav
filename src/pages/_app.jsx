import { UserProvider } from "../context/UserContext";
import "./styles/global.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
