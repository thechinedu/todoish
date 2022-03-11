import styles from "@/styles/Home.module.css";

import Container from "@/components/Container";
import Header from "@/components/Header";

import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Container className={styles.container}>
      <Head>
        <title>Todoish</title>
      </Head>

      <Header />
    </Container>
  );
};

export default Home;
