import { PropTypes } from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseInline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { getContentDataClient } from "../utilities/getContentDataClient";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const getLayout = Component.getLayout || ((page) => page);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      router.pathname == "/" ||
      sessionStorage.getItem("contents") != undefined
    )
      return;
    const handleOnLogin = async () => {
      const docIds = ["test1", "test2"];
      let contentsInfo = [];
      await Promise.all(
        docIds.map(async (id) => {
          const info = await getContentDataClient(`contents/${id}`);
          contentsInfo.push(info);
        })
      );
      sessionStorage.setItem(
        "contents",
        JSON.stringify(contentsInfo, undefined, 1)
      );
      console.log("Login: ", sessionStorage.getItem("contents"));
      setLogin(true);
      // router.push('/dashboard');
    };
    handleOnLogin();
  }, [router.pathname]);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    if (sessionStorage.getItem("contents")) setLogin(true);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events, router.asPath]);

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
    }
  }, [router.isReady]);

  const loadingComponent = <h2>Loading...</h2>;
  if (!loading) return <h3>router準備中</h3>;
  if (router.pathname != "/" && !isLogin) return <h3>ログイン中です</h3>;

  if (!pageProps.dashboard) return <Component {...pageProps} />;

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
