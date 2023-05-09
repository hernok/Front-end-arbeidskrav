import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

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
          <Link href="/about">
            <span className={styles.navbar__link}>About</span>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/services">
            <span className={styles.navbar__link}>Services</span>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/contact">
            <span className={styles.navbar__link}>Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
