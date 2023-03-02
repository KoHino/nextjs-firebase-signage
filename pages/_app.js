import { PropTypes } from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseInline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";

const clientSideEmotionCache = createEmotionCache();

const useRedirectLogin = (isLogin, loading) => {
  const router = useRouter();
  if (router.pathname === "/") return;
  if (!loading) return <h2>router準備中</h2>;
  if (!isLogin && router.pathname !== "/dashboard/Login") router.push("/dashboard/Login");
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const getLayout = Component.getLayout || ((page) => (page));
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // ToDo: firebase authを使ってログイン状態を判定 
    if (sessionStorage.getItem('contents') != undefined) {
      setLogin(true);
    }

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  }, [router.events, router.asPath])

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
    }
  }, [router.isReady])

  useRedirectLogin(isLogin, loading);

  const loadingComponent = (<h2>Loading...</h2>)

  if (!pageProps.dashboard) return <Component {...pageProps} />

  return getLayout(
    <CacheProvider value={emotionCache}>
      {/* <Head>
        <meta name="viewport" content="initial-sclale=1, width=device-width" />
      </Head> */}
      <ThemeProvider theme={theme}>
        <CssBaseInline />
        <Dashboard>
          {pageLoading && loadingComponent}
          <Component {...pageProps} />
        </Dashboard>
      </ThemeProvider>
    </CacheProvider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};