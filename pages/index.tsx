import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { container } from "../cosmos";
import { Question } from "../components/Question";

export async function getServerSideProps() {
  const querySpec = {
    query: "SELECT count(c.id) as count from c",
  };

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  return {
    props: {
      count: items[0].count,
    },
  };
}

const Home: NextPage<{ count: number }> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test your trivia skills</title>
        <meta name="description" content="An awesome trivia app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Trivia time!</h1>

        <Question count={props.count} />
      </main>

      <footer className={styles.footer}>
        Build with Next.js,{" "}
        <a
          href="https://https://docs.microsoft.com/azure/static-web-apps/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Azure
        </a>
      </footer>
    </div>
  );
};

export default Home;
