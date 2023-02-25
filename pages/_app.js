// import 'tailwindcss/tailwind.css'
import Head from "next/head";
import { PropTypes } from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseInline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";


const clientSideEmotionCache = createEmotionCache();
export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => (page));
  return getLayout(
    <CacheProvider value={emotionCache}>
      {/* <Head>
        <meta name="viewport" content="initial-sclale=1, width=device-width" />
      </Head> */}
      <ThemeProvider theme={theme}>
        <CssBaseInline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};