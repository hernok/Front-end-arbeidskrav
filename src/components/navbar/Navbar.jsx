import React, { useContext } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Logout from "../logout/Logout";
import UserContext from "../../context/UserContext";
import { slide as Menu } from "react-burger-menu";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";
  const BurgerIcon = <div className={styles["burger-icon"]}>≡</div>;

  const menuStyles = {
    bmBurgerButton: {
      position: "absolute",
      width: "60px",
      height: "60px",
      right: "0px",
      top: "0px",
      zIndex: 1,
    },
    bmMenuWrap: { padding: 0, height: "auto", position: "absolute" },
    bmMenu: {
      right: 0,
      top: "30px",
      position: "absolute",
      background: "#58259f",
      height: "auto",
      overflow: "auto",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    bmItem: { padding: "0 0 0 20px" },
    bmItemList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "150px",
    },
    bmOverlay: { width: 0, background: "transparent" },
    bmCrossButton: {
      height: 0,
      width: 0,
    },
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>
        <Link href="/">
          <span className={styles["navbar-link"]}>YourLogo</span>
        </Link>
      </div>
      <div className={styles.hamburgerMenu}>
        <Menu right styles={menuStyles} customBurgerIcon={BurgerIcon}>
          <ul className={styles["navbar-links"]}>
            <li className={styles["navbar-item"]}>
              <Link href="/">
                <span className={styles["navbar-link"]}>Login</span>
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              <Link href="/hotdog-stands">
                <span className={styles["navbar-link"]}>Hotdog stands</span>
              </Link>
            </li>
            {isAdmin && (
              <>
                <li className={styles["navbar-item"]}>
                  <Link href="/edit-stands">
                    <span className={styles["navbar-link"]}>Edit Stands</span>
                  </Link>
                </li>
                <li className={styles["navbar-item"]}>
                  <Link href="/create-stand">
                    <span className={styles["navbar-link"]}>Create Stand</span>
                  </Link>
                </li>
              </>
            )}
            <li className={styles["navbar-item"]}>
              <Logout />
            </li>
          </ul>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
