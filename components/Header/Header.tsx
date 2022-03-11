import styles from "./index.module.css";
import headerImg from "@/public/header.webp";

import Container from "@/components/Container";
import Logo from "@/components/Icons/Logo";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <Link href="/login">
          <a>Log in</a>
        </Link>

        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </nav>

      <section className={styles.heroContainer}>
        <h1 className={styles.welcomeMessage}>Organize it all with Todoish</h1>
        <Link href="/signup">
          <a>Get Started</a>
        </Link>

        <Image src={headerImg} alt="Decorative background" />
      </section>
    </header>
  );
};

export default Header;
