"use client";
// import React, { use, useEffect, useState } from "react";
import React, { useState } from "react";
import { useRef } from "react";
// import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";

import { executeCode } from "./api/pistonAPI";

// type Post = {
//   id: number;
//   title: string;
// };

export default function Home() {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [newTitle, setNewTitle] = useState("");

  // const fetchPosts = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  //     // const response = await fetch("https://paiza-learn-back.onrender.com/posts");
  //     if (!response.ok) {
  //       throw new Error("データの取得に失敗しました");
  //     }
  //     const data = await response.json();
  //     setPosts(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
  //       // const response = await fetch("https://paiza-learn-back.onrender.com/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title: newTitle }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("投稿に失敗しました");
  //     }
  //     setNewTitle("");
  //     fetchPosts();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const [value, setValue] = useState("");

  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  async function showValue() {
    const jsCode = editorRef.current.getValue();
    // const result = new Function(jsCode)();
    // result;
    // setValue(String(result));
    // const code = await executeCode("ruby", jsCode);
    const code = await executeCode("ruby", jsCode);
    setValue(code.run.output);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-3xl mb-4">コードエディター</h2>
      <Editor
        height="20vh"
        defaultLanguage="ruby"
        defaultValue="# Hello World"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={showValue}
      >
        Button
      </button>
      <textarea className="w-1/2 h-1/2 p-2 border text-black" readOnly={true} value={value} />
      {/* <form onSubmit={handleSubmit} className="mt-4 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="新しい投稿のタイトル"
          className="mr-2 p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          投稿する
        </button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
    </main>
  );
}
