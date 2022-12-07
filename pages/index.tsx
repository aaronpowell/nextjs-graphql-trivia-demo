import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { container } from "../cosmos";
import { Question } from "../components/Question";
import Navbar from "./components/Navbar";

export async function getServerSideProps() {
  const querySpec = {
    query: "SELECT count(c.id) as count from c",
  };

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  console.log(`getServerSideProps count=1`);


  return {
    props: {
      count: 1 //items[0].count / 20,
    },
  };
}

const Home: NextPage<{ count: number }> = (props) => {

  console.log(`Home count=1`);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>Test your trivia skills</title>
          <meta name="description" content="An awesome trivia app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Trivia time!</h1>

          <Question count={props.count} gameQuestionCount={5}/>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Build with Next.js
          </a>

          <a
            href="https://docs.microsoft.com/azure/static-web-apps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Azure
          </a>

          <a
            href="https://github.com/aaronpowell/nextjs-graphql-trivia-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Sourced on GitHub
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
