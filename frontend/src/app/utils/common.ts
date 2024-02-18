import { formatDistanceToNow } from "date-fns";

export const copyClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {}
};

export const truncateString = (text: string, num: number): string => {
  if (text.length <= num) {
    return text;
  }

  return text.slice(0, num) + "...";
};

export const getTimeAgo = (date: Date) => {
  const dateToCompare = date instanceof Date ? date : new Date(date);

  return formatDistanceToNow(dateToCompare, { addSuffix: true });
};
