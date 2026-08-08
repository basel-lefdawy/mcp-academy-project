import path from "path";
import fs from "fs/promises";

const DATA_DIR = path.resolve("./data");

export async function readDataFile(filename: string) {
  const filePath = path.resolve(DATA_DIR, filename);

  // Prevent leaving the data folder
  if (!filePath.startsWith(DATA_DIR)) {
    throw new Error("Invalid file path");
  }

  return fs.readFile(filePath, "utf-8");
}