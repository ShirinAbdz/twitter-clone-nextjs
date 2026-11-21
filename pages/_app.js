import Layout from "@/Components/Layout/layout";
import { AppProvider } from "@/Components/context/AppContext";
import "../Components/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
