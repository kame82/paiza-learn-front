export const executeCode = async (language: string, execCode: string) => {
  const body = {
    language: language,
    version: "3.0.1", //ruby_ver
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
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
