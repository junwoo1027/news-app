import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Oauth: NextPage = () => {
  const router = useRouter();
  const cookies = new Cookies();

  const { token, tokenExpAt, refresh, refreshExpAt } = router.query;

  const saveCookie = (name: string, value: string, expAt: string) => {
    const expires = new Date(expAt.toString());
    expires.setHours(expires.getHours() + 9);
    cookies.set(name, value, {
      path: "/",
      expires,
      secure: true,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (token && tokenExpAt && refresh && refreshExpAt) {
      saveCookie("NEWSAK", token.toString(), tokenExpAt.toString());
      saveCookie("NEWSRK", refresh.toString(), refreshExpAt.toString());
    }

    router.replace("/");
  }, [router.isReady, router.query]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </div>
  );
};

export default Oauth;
