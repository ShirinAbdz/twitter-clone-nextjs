import Layout from "@/Components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;
