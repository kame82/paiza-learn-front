"use client";

export const executeCode = async (
  language: string,
  execCode: string,
  handleComplete: () => void
) => {
  const LangVersion: { [key: string]: string } = {
    ruby: "3.0.1",
    javascript: "18.15.0",
    python: "3.10.0",
    php: "8.2.3",
    java: "15.0.2",
    go: "1.16.2",
  };

  const body = {
    language: language,
    version: LangVersion[language],
    files: [
      {
        content: execCode,
      },
    ],
  };
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("コードの実行に失敗しました");
    }
    const data = await response.json();
    handleComplete();
    return data;
  } catch (error) {
    console.error(error);
    handleComplete();
    throw error;
  }
};
