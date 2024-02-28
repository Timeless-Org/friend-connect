import { getChatModel } from "../models/chat";
import { createMessageModel } from "../models/message";
import { getUserModel } from "../models/user";

export const createMessageService = async (address: string, objectAddress: string, text: string): Promise<boolean> => {
  const user = await getUserModel(address);
  if (!user) throw new Error("User not found");

  const chat = await getChatModel(objectAddress);
  if (!chat) throw new Error("Chat not found");

  const message = await createMessageModel(chat.id, user.id, text);
  if (!message) throw new Error("Message not found");

  return true;
};
