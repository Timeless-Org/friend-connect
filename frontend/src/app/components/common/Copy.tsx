import { copyClipboard } from "@/utils/common";
import { useState } from "react";

interface ICopy {
    copyText: string;
    content: React.ReactNode | string;
    setIsCopied: (isCopied: boolean) => void;
}

const Copy = ({ copyText, content, setIsCopied }: ICopy) => {
  const handleCopy = async () => {
    try {
      await copyClipboard(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {}
  };

  return (
    <button type="button" onClick={() => handleCopy()}>
      {content}
    </button>
  );
};

export default Copy;
