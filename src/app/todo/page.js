"use client"; // 新結構中常用於啟用客戶端渲染

import { useState } from "react";
export const metadata = {
  title: "待辦事項", // 設定頁面的標題
  description: "管理您的待辦事項", // （可選）描述頁面的用途
};



export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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
  );
}