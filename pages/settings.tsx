import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../src/api";
import styles from "../styles/Home.module.css";
import Modal from "../src/Modal";

const Settings: NextPage = () => {
  const router = useRouter();
  const [targets, setTargets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const getTargets = async () => {
    await api
      .get("/api/v1/targets")
      .then((res) => {
        setTargets(res.data.data);
      })
      .catch((error) => {
        const { code, message } = error.response.data.error;
        console.log(message);
      });
  };

  const deleteTarget = async (id: number) => {
    await api
      .delete("/api/v1/targets/" + id)
      .then(() => {
        alert("삭제 완료!");
        getTargets();
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm("삭제하시겠습니까?")) {
      deleteTarget(id);
    }
  };

  useEffect(() => {
    getTargets();
  }, []);

  return (
    <div className={styles.container}>
      <h1>뉴스 데이터 수집 설정</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className={styles.button} onClick={() => router.push("/")}>
          목록으로
        </button>
        <button className={styles.button} onClick={openModal}>
          키워드 추가
        </button>
      </div>

      <table className={styles.table} border={1}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Keyword</th>
            <th>Source</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {targets.length === 0 && (
            <tr>
              <td colSpan={4}>No data.</td>
            </tr>
          )}

          {targets.map((article: any, idx) => {
            return (
              <tr key={"article-" + idx}>
                <td>{article.id}</td>
                <td>{article.keyword}</td>
                <td>{article.articleSource}</td>
                <td>
                  <button onClick={() => handleDelete(article.id)}>삭제</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Settings;
