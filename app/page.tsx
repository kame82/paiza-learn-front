"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import Editor from "@monaco-editor/react";
import dynamic from "next/dynamic";
import * as monaco from "monaco-editor";
import { executeCode } from "./api/pistonAPI";

// 動的に Monaco Editor をインポート
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("ruby");

  const handleComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    const defaultMessage = (lang: string) => {
      switch (lang) {
        case "ruby":
          return "# Hello World";
        case "javascript":
          return "// Hello World";
        default:
          return "# Hello World";
      }
    };

    if (editorRef.current) {
      const model = editorRef.current.getModel() as monaco.editor.ITextModel; // モデルを取得
      monaco.editor.setModelLanguage(model, language); // 言語を変更
      editorRef.current.setValue(defaultMessage(language));
    }
  }, [language]);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    _monaco: typeof monaco
  ) {
    editorRef.current = editor;
  }

  async function showValue() {
    setLoading(true);
    if (!editorRef.current) {
      handleComplete();
      return;
    }
    const jsCode = editorRef.current.getValue();
    const code = await executeCode(language, jsCode);
    setValue(code.run.output);
    handleComplete();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-8">
      <h2 className="text-3xl mb-4">コードエディター</h2>
      <div className="mx-auto w-full max-w-xs text-gray-800">
        <div className="mt-1">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 cursor-pointer block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="ruby">{`Ruby ("3.0.1")`}</option>
            <option value="javascript">{`JavaScript ("18.15.0")`}</option>
          </select>
        </div>
      </div>
      <Editor
        height="40vh"
        className="max-w-4xl w-full mx-auto mt-4"
        defaultLanguage={language}
        defaultValue="# Hello World"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      {loading || (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={showValue}
        >
          実行
        </button>
      )}
      {loading && (
        <div className="flex justify-center" aria-label="読み込み中">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mt-4"></div>
        </div>
      )}
      <textarea
        className="max-w-2xl w-full mx-auto md:h-40 h-20 p-2 border text-black mt-8"
        readOnly={true}
        value={value}
      />
    </main>
  );
}
