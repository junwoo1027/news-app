import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>뉴스 데이터 수집 서비스</h1>

      <Link href="https://github.com/login/oauth/select_account?client_id=Iv23liz3ISDe7MoYcfuN">
        <button className={styles.loginButton}>로그인</button>
      </Link>
    </div>
  );
};

export default Login;
