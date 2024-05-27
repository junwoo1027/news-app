import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { api } from "../src/api";
import Cookies from "universal-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("NEWSAK");
    cookies.remove("NEWSRK");
  };

  const refreshToken = async () => {
    await api.get("/api/v1/tokens/refresh").catch((error) => {
      logout();
      router.push("/login");
    });
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data.error.code === "E1001") {
        refreshToken();
      }
      return Promise.reject(error);
    }
  );

  return <Component {...pageProps} />;
}
export default MyApp;
