import Layout from "@/Components/Layout/layout";
import "../Components/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />

    </Layout>
  );
}

export default MyApp;
