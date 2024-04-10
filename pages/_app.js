import Layout from "../Components/Layout/layout.js";
import "../Components/styles/globals.css";

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout>
      <Component {...pageProps} />
      

    </Layout>
  );
}

export default MyApp;
