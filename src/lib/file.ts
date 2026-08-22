import path from "path";
import fs from "fs/promises";

const DATA_DIR = path.resolve("./data");

export async function readDataFile(filename: string) {
  const normalizedFilename = path.normalize(filename);
  const parentPrefix = `..${path.sep}`;

  if (
    path.isAbsolute(normalizedFilename) ||
    normalizedFilename === ".." ||
    normalizedFilename.startsWith(parentPrefix)
  ) {
    throw new Error("Invalid file path");
  }

  const filePath = path.resolve(DATA_DIR, normalizedFilename);
  const relativePath = path.relative(DATA_DIR, filePath);

  if (relativePath.startsWith(`..${path.sep}`) || relativePath === ".." || path.isAbsolute(relativePath)) {
    throw new Error("Invalid file path");
  }

  return fs.readFile(filePath, "utf-8");
}