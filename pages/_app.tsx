import "../styles/globals.css";
import "../styles/prism/theme.css";
import styles from './_app.module.css';

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Head>
        <title>Joko's Blog</title>
      </Head>
      <header>
        <a href="/" className={styles.me}>Jon Koenig</a>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
