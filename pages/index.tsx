import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../src/api";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    await api
      .get("/api/v1/articles")
      .then((res) => {
        setArticles(res.data.data);
      })
      .catch((error) => {
        const { code, message } = error.response.data.error;
        console.log(message);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.container}>
      <h1>뉴스 데이터 수집 서비스</h1>

      <button
        className={styles.button}
        onClick={() => router.push("/settings")}
      >
        수집 설정
      </button>

      <table className={styles.table} border={1}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Keyword</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {articles.length === 0 && (
            <tr>
              <td colSpan={6}>No data.</td>
            </tr>
          )}

          {articles.map((article: any, idx) => {
            return (
              <tr key={"article-" + idx}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>
                  <a className={styles.a} href={article.link} target="_blank">
                    방문
                  </a>
                </td>
                <td>{article.keyword}</td>
                <td>{article.articleSource}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
