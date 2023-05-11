import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Logout from "../logout/Logout";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <span className={styles.navbar__link}>YourLogo</span>
        </Link>
      </div>
      <ul className={styles.navbar__links}>
        <li className={styles.navbar__item}>
          <Link href="/">
            <span className={styles.navbar__link}>Login</span>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/hotdog-stands">
            <span className={styles.navbar__link}>Hotdog stands</span>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
