"use client"; // 新結構中常用於啟用客戶端渲染

import { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";





export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    // 動態修改網頁的標題
    document.title = "待辦事項";
  }, []);


  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <>
      {/* 動態設置 <title> */}
      <Head>
          <title>待辦事項</title>
      </Head>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>待辦事項清單</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入待辦事項"
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <button onClick={addTask} style={{ padding: "10px", marginLeft: "10px",cursor: "pointer" ,border: "solid 1px #ccc",backgroundColor: "#0070f3",color: "yellow"}}>
          新增
        </button>
        <ul style={{ marginTop: "20px" }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {task}{" "}
              <button
                onClick={() => removeTask(index)}
                style={{
                  marginLeft: "30px",
                  padding: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
              刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}