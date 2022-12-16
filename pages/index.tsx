import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getExistingContainer } from "../azure/azureCosmosdb";
import { Question } from "../components/Question";
import Navbar from "./components/Navbar";

// Server side rendering
export async function getServerSideProps() {
  const querySpec = {
    query: "SELECT count(c.id) as count from c",
  };

  const container = await getExistingContainer();

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  // This value is used in server side rendering
  return {
    props: {
      buildOn: new Date().toLocaleString(),
      count: items[0].count, // Should equal CONSTANTS.MAX_ITEMS_IN_DATABASE (100)
    },
  };
}

const Home: NextPage<{ count: number; buildOn: string }> = (props) => {
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

          <Question count={props.count} gameQuestionCount={5} />
        </main>

        <footer className={styles.footer}>
          Built on: {props.buildOn}
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
