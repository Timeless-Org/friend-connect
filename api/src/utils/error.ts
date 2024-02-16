export const normalizeErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error.trim().toLowerCase(); // エラーが文字列の場合
  } else if (error instanceof Error) {
    return error.message.trim().toLowerCase(); // エラーがErrorオブジェクトの場合
  }
  return ""; // 上記のどちらでもない場合、空文字列を返す
};
