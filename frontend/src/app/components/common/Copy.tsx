import { copyClipboard } from "@utils/common";

interface ICopy {
  copyText: string;
  content?: React.ReactNode | string;
  setIsCopied: (isCopied: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

const Copy = ({
  copyText,
  content,
  setIsCopied,
  className,
  children,
}: ICopy) => {
  const handleCopy = async () => {
    try {
      await copyClipboard(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {}
  };

  return (
    <button type="button" onClick={() => handleCopy()} className={className}>
      {content || children}
    </button>
  );
};

export default Copy;
