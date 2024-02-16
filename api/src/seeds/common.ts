import fs from "fs";
import path from "path";

export const readJson = async (fileName: string) => {
  const jsonFilePath = path.resolve(__dirname, `./json/${fileName}.json`);
  const jsonData = await fs.promises.readFile(jsonFilePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
};
