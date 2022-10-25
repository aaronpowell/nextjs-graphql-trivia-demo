import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <LocaleSwitcher />
    </nav>
  );
}
