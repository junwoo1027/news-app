import React, { useState } from "react";
import { api } from "./api";

const Modal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState<"NAVER" | "DAUM" | "ALL">("NAVER");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    if (!isLoading) {
      setKeyword("");
      setSource("NAVER");
      closeModal();
    }
  };

  const handleKeyword = (e: any) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleSource = (e: any) => {
    const value = e.target.value;
    setSource(value);
  };

  const createTarget = async () => {
    await api
      .post("/api/v1/targets", {
        keyword,
        articleSource: source,
      })
      .then(() => {
        createArticles();
        alert("키워드 등록 완료!");
        handleCloseModal();
      })
      .catch((error) => {
        const { code, message } = error.response.data.error;
        if (code === "E1000") {
          alert("이미 등록된 키워드입니다.");
        }
        console.log(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createArticles = async () => {
    await api
      .post("/api/v1/articles", { keyword, articleSource: source })
      .catch((error) => {
        console.log(error.response.data.error.message);
      });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    createTarget();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {isLoading && <div className="loading">Loading...</div>}
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <br />
        <br />
        <div className="form">
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={keyword}
            onChange={handleKeyword}
            disabled={isLoading}
          />
          <label htmlFor="source">Source:</label>
          <select
            id="source"
            name="source"
            onChange={handleSource}
            disabled={isLoading}
          >
            <option value="NAVER">네이버</option>
            <option value="DAUM">다음</option>
            <option value="ALL">네이버, 다음</option>
          </select>
          <button
            className="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            추가
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          width: 500px;
          position: relative;
        }
        .loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          z-index: 1;
        }
        .close {
          float: right;
          font-size: 28px;
          cursor: pointer;
        }
        .close:hover {
          color: #000;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 0.5em;
          color: #333;
          font-weight: bold;
        }
        input[type="text"],
        select {
          padding: 10px;
          margin-bottom: 20px;
          border: 2px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box; /* Include padding and border in the element's width */
        }
        .submit {
          font-size: 16px;
          font-weight: bold;
          color: white;
          background-color: #4caf50; /* Green */
          border: none;
          border-radius: 5px;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Modal;
